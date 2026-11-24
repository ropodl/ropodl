import { spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const command = process.argv[2]
const allowedCommands = new Set(['dev', 'typecheck', 'build'])

if (!allowedCommands.has(command)) {
  throw new Error(`Expected one of: ${[...allowedCommands].join(', ')}.`)
}

const stagedEnvRoot = join(root, '.void', 'legacy-env')

if (existsSync(stagedEnvRoot)) {
  for (const directory of readdirSync(stagedEnvRoot, { withFileTypes: true })) {
    if (!directory.isDirectory()) continue
    const backupDirectory = join(stagedEnvRoot, directory.name)
    let recoveryConflict = false
    for (const name of readdirSync(backupDirectory)) {
      const originalPath = join(root, name)
      const backupPath = join(backupDirectory, name)
      if (existsSync(originalPath)) {
        console.error(`Cannot restore ${backupPath}: ${originalPath} already exists.`)
        recoveryConflict = true
        continue
      }
      renameSync(backupPath, originalPath)
    }
    if (!recoveryConflict) rmSync(backupDirectory, { recursive: true, force: true })
  }
}

const names = readdirSync(root)
const legacyEnvFiles = names.filter(name => name.startsWith('.env.') || name === '.dev.vars' || name.startsWith('.dev.vars.'))
const devVars = join(root, '.dev.vars')
const envFile = join(root, '.env')

if (!existsSync(envFile) && existsSync(devVars)) {
  copyFileSync(devVars, envFile)
}

const backupDirectory = join(root, '.void', 'legacy-env', randomUUID())
const movedFiles = []

try {
  if (legacyEnvFiles.length > 0) {
    mkdirSync(backupDirectory, { recursive: true })
    for (const name of legacyEnvFiles) {
      const originalPath = join(root, name)
      const backupPath = join(backupDirectory, name)
      renameSync(originalPath, backupPath)
      movedFiles.push({ originalPath, backupPath })
    }
  }

  const executable = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'nuxt.cmd' : 'nuxt')
  const child = spawn(executable, [command, ...process.argv.slice(3)], {
    cwd: root,
    env: {
      ...process.env,
      VOID_NUXT_INTEGRATION: '1',
      ...(command === 'build' ? { NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=8192' } : {})
    },
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })

  const exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject)
    child.once('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)))
    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.once(signal, () => child.kill(signal))
    }
  })

  process.exitCode = exitCode
} finally {
  let restoreFailed = false
  for (const { originalPath, backupPath } of movedFiles.reverse()) {
    if (!existsSync(backupPath)) continue
    if (existsSync(originalPath)) {
      console.error(`Kept staged environment file at ${backupPath}; ${originalPath} now exists.`)
      restoreFailed = true
      continue
    }
    mkdirSync(dirname(originalPath), { recursive: true })
    renameSync(backupPath, originalPath)
  }

  if (!restoreFailed) rmSync(backupDirectory, { recursive: true, force: true })
  if (restoreFailed) process.exitCode = 1
}
