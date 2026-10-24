import { watch } from 'node:fs'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'

const sourceDirectories = ['app', 'server', 'public', 'drizzle'].filter(existsSync)
const watchedFiles = ['nuxt.config.ts', 'package.json', 'drizzle.config.ts'].filter(existsSync)
const watchOnly = process.argv.includes('--watch-only')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
let buildProcess
let workerProcess
let buildQueued = false
let debounceTimer
let stopping = false

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })
    child.once('error', reject)
    child.once('exit', code => resolve(code ?? 1))
  })
}

async function build() {
  if (buildProcess || stopping) {
    buildQueued = true
    return
  }

  buildProcess = spawn(npm, ['run', 'build'], { stdio: 'inherit' })
  buildProcess.once('error', (error) => {
    console.error('Could not start Nuxt build:', error)
  })
  buildProcess.once('exit', (code) => {
    buildProcess = undefined
    if (code === 0) console.log('Nuxt build complete. Wrangler will reload the local Worker.')
    else console.error(`Nuxt build failed with exit code ${code}; the previous build remains available.`)
    if (buildQueued && !stopping) {
      buildQueued = false
      void build()
    }
  })
}

function queueBuild() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => void build(), 700)
}

if (!watchOnly) {
  const initialBuildExitCode = await run(npm, ['run', 'build'])
  if (initialBuildExitCode !== 0) process.exit(initialBuildExitCode)
}

for (const directory of sourceDirectories) {
  const watcher = watch(directory, { recursive: true }, queueBuild)
  watcher.on('error', error => console.error(`Watcher error for ${directory}:`, error))
}
for (const file of watchedFiles) {
  const watcher = watch(file, queueBuild)
  watcher.on('error', error => console.error(`Watcher error for ${file}:`, error))
}

console.log('Watching app, server, public, and drizzle files. Successful builds reload Wrangler automatically.')
if (!watchOnly) {
  workerProcess = spawn(npm, ['run', 'cf:worker'], {
    stdio: 'inherit',
    env: { ...process.env, XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME || '/tmp/nuxt-app-wrangler' }
  })
  workerProcess.once('exit', (code) => {
    workerProcess = undefined
    if (!stopping && code !== 0) process.exitCode = code ?? 1
  })
}

function stop() {
  stopping = true
  clearTimeout(debounceTimer)
  buildProcess?.kill('SIGTERM')
  workerProcess?.kill('SIGTERM')
}
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
