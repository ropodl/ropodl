import { randomUUID } from 'node:crypto'
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { hashPassword } from 'better-auth/crypto'

if (existsSync('.env')) {
  process.loadEnvFile('.env')
}

const remote = process.argv.includes('--remote')
const email = process.env.ADMIN_EMAIL || (remote ? '' : 'admin@example.com')
const previousEmail = process.env.ADMIN_PREVIOUS_EMAIL || ''
const name = process.env.ADMIN_NAME || 'Admin'
const password = process.env.ADMIN_PASSWORD || (remote ? '' : 'admin123')
if (!email || !password) {
  throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD before seeding a remote admin account.')
}
const id = randomUUID()
const now = Date.now()
const hashedPassword = await hashPassword(password)
const quote = value => `'${String(value).replaceAll("'", "''")}'`
const migratePreviousEmail = previousEmail && previousEmail !== email
  ? `UPDATE "user" SET email = ${quote(email)}, name = ${quote(name)}, emailVerified = 1, updatedAt = ${now} WHERE email = ${quote(previousEmail)} AND NOT EXISTS (SELECT 1 FROM "user" WHERE email = ${quote(email)});\n`
  : ''
const sql = `${migratePreviousEmail}INSERT OR IGNORE INTO "user" (id, name, email, emailVerified, createdAt, updatedAt) VALUES (${quote(id)}, ${quote(name)}, ${quote(email)}, 1, ${now}, ${now});\nUPDATE "user" SET name = ${quote(name)}, emailVerified = 1, updatedAt = ${now} WHERE email = ${quote(email)};\nUPDATE "account" SET password = ${quote(hashedPassword)}, updatedAt = ${now} WHERE providerId = 'credential' AND userId = (SELECT id FROM "user" WHERE email = ${quote(email)} LIMIT 1);\nINSERT INTO "account" (id, accountId, providerId, userId, password, createdAt, updatedAt) SELECT ${quote(randomUUID())}, id, 'credential', id, ${quote(hashedPassword)}, ${now}, ${now} FROM "user" WHERE email = ${quote(email)} AND NOT EXISTS (SELECT 1 FROM "account" WHERE providerId = 'credential' AND userId = "user".id);\n`
const directory = mkdtempSync(join(tmpdir(), 'project-admin-seed-'))
const sqlFile = join(directory, 'seed.sql')
writeFileSync(sqlFile, sql, { mode: 0o600 })

try {
  const target = remote ? '--remote' : '--local'
  const wrangler = join(process.cwd(), 'node_modules', '.bin', process.platform === 'win32' ? 'wrangler.cmd' : 'wrangler')
  const result = spawnSync(wrangler, ['d1', 'execute', 'saroj-portfolio', target, '--file', sqlFile], { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Wrangler exited with status ${result.status}.`)
  console.info(`Admin account is ready in the ${target === '--remote' ? 'remote' : 'local'} D1 database: ${email}.`)
} finally {
  rmSync(directory, { recursive: true, force: true })
}
