import { spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const requestedCommand = process.argv[2]
const staging = requestedCommand?.startsWith('staging:')
const command = staging ? requestedCommand.slice('staging:'.length) : requestedCommand
const args = process.argv.slice(3)
const allowedCommands = new Set(['dev', 'typecheck', 'build', 'deploy'])

if (!allowedCommands.has(command) || (command === 'deploy' && !staging)) {
  throw new Error('Expected dev, typecheck, build, staging:dev, staging:typecheck, staging:build, or staging:deploy.')
}

if (command === 'deploy') {
  const configPath = join(root, '.void-wrangler.jsonc')
  if (!existsSync(configPath)) throw new Error('Staging deploy blocked: connect the staging config first.')
  const config = JSON.parse(readFileSync(configPath, 'utf8'))
  const d1 = config.d1_databases?.find(binding => binding.binding === 'DB')
  const kv = config.kv_namespaces?.find(binding => binding.binding === 'APP_KV')
  const uploads = config.r2_buckets?.find(binding => binding.binding === 'UPLOADS')
  if (config.name !== 'saroj-portfolio-staging'
    || config.workers_dev !== true
    || config.preview_urls !== true
    || (config.routes?.length ?? 0) !== 0
    || d1?.database_id !== '4a48d6f4-a382-410b-b098-46181da2362b'
    || kv?.id !== '45f053d9935d439ebbf0a68fce360eef'
    || uploads?.bucket_name !== 'saroj-portfolio-staging-uploads'
    || config.send_email) {
    throw new Error('Staging deploy blocked: generated Worker config is not isolated from production.')
  }
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

  const executable = command === 'deploy'
    ? process.execPath
    : join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'nuxt.cmd' : 'nuxt')
  const childArgs = command === 'deploy'
    ? [join(root, 'node_modules', 'void', 'dist', 'cli', 'cli.mjs'), 'deploy', ...args]
    : [command, ...args]
  const child = spawn(executable, childArgs, {
    cwd: root,
    env: {
      ...process.env,
      ...(staging ? { VOID_TARGET: 'staging' } : command === 'dev' ? { VOID_TARGET: 'local' } : {}),
      VOID_NUXT_INTEGRATION: '1',
      ...(command === 'build' || command === 'deploy' ? { NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=8192' } : {})
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
