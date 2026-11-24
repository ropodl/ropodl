import { randomBytes, randomUUID } from 'node:crypto'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { hashPassword } from 'better-auth/crypto'

const root = fileURLToPath(new URL('../', import.meta.url))
const configPath = join(root, '.void-wrangler.jsonc')
const config = JSON.parse(await (await import('node:fs/promises')).readFile(configPath, 'utf8'))
const stagingD1Id = '4a48d6f4-a382-410b-b098-46181da2362b'
const databaseName = 'saroj-portfolio-staging'
const origin = 'https://saroj-portfolio-staging.sarox14.workers.dev'
const stagingBucket = 'saroj-portfolio-staging-uploads'

if (config.name !== 'saroj-portfolio-staging'
  || config.workers_dev !== true
  || (config.routes?.length ?? 0) !== 0
  || config.d1_databases?.find(binding => binding.binding === 'DB')?.database_id !== stagingD1Id) {
  throw new Error('Staging auth smoke test refused to run: generated config is not isolated staging.')
}

function sqlQuote(value) {
  return `'${String(value).replaceAll(/'/g, '\u0027\u0027')}'`
}

function runWrangler(args) {
  const executable = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'wrangler.cmd' : 'wrangler')
  const result = spawnSync(executable, ['--config', configPath, ...args], {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Wrangler exited with status ${result.status}.`)
}

const userId = randomUUID()
const email = `void-staging-${userId}@example.invalid`
const password = randomBytes(32).toString('base64url')
const passwordHash = await hashPassword(password)
const now = Date.now()
const directory = mkdtempSync(join(tmpdir(), 'void-staging-auth-'))
const sqlFile = join(directory, 'seed.sql')
const cleanupSql = `DELETE FROM "user" WHERE id = ${sqlQuote(userId)};`
const objectKey = `uploads/${userId}/void-staging-smoke.txt`
const objectContents = `staging-r2-smoke:${userId}`
const objectFile = join(directory, 'smoke.txt')
writeFileSync(objectFile, objectContents, { mode: 0o600 })
let seeded = false
let objectUploaded = false

try {
  const seedSql = `INSERT INTO "user" (id, name, email, emailVerified, createdAt, updatedAt) VALUES (${sqlQuote(userId)}, 'Void Staging Smoke', ${sqlQuote(email)}, 1, ${now}, ${now});\nINSERT INTO "account" (id, accountId, providerId, userId, password, createdAt, updatedAt) VALUES (${sqlQuote(randomUUID())}, ${sqlQuote(userId)}, 'credential', ${sqlQuote(userId)}, ${sqlQuote(passwordHash)}, ${now}, ${now});\n`
  writeFileSync(sqlFile, seedSql, { mode: 0o600 })
  runWrangler(['d1', 'execute', databaseName, '--remote', '--file', sqlFile])
  seeded = true

  const signIn = await fetch(`${origin}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({ email, password }),
    signal: AbortSignal.timeout(15000)
  })
  await signIn.body?.cancel()
  if (!signIn.ok) throw new Error(`Staging sign-in returned HTTP ${signIn.status}.`)

  const cookies = signIn.headers.getSetCookie().map(cookie => cookie.split(';', 1)[0]).join('; ')
  if (!cookies) throw new Error('Staging sign-in succeeded without returning a session cookie.')

  const protectedResponse = await fetch(`${origin}/api/admin/blogs`, {
    headers: { cookie: cookies },
    signal: AbortSignal.timeout(15000)
  })
  await protectedResponse.body?.cancel()
  if (protectedResponse.status !== 200) throw new Error(`Authenticated staging GET /api/admin/blogs returned HTTP ${protectedResponse.status}.`)
  console.info('Staging auth smoke passed: email sign-in created a session and the protected admin API returned HTTP 200.')

  runWrangler(['r2', 'object', 'put', `${stagingBucket}/${objectKey}`, '--remote', '--file', objectFile, '--content-type', 'text/plain'])
  objectUploaded = true
  const objectResponse = await fetch(`${origin}/api/uploads/${objectKey}`, { signal: AbortSignal.timeout(15000) })
  const downloadedObject = await objectResponse.text()
  if (objectResponse.status !== 200 || downloadedObject !== objectContents) {
    throw new Error(`Staging R2 round trip failed: GET returned HTTP ${objectResponse.status}.`)
  }
  console.info('Staging R2 smoke passed: uploaded test object was served by the Worker with matching contents.')
} finally {
  if (objectUploaded) {
    runWrangler(['r2', 'object', 'delete', `${stagingBucket}/${objectKey}`, '--remote'])
  }
  if (seeded) {
    runWrangler(['d1', 'execute', databaseName, '--remote', '--command', cleanupSql])
  }
  rmSync(directory, { recursive: true, force: true })
}
