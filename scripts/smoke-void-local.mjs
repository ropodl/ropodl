import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const port = 4317
const child = spawn(process.execPath, ['scripts/void-command.mjs', 'dev', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: root,
  stdio: 'inherit'
})

try {
  let response
  for (let attempt = 0; attempt < 40; attempt++) {
    if (child.exitCode !== null) throw new Error(`Void dev server exited early with code ${child.exitCode}.`)
    try {
      response = await fetch(`http://127.0.0.1:${port}/api/blogs`, { signal: AbortSignal.timeout(1500) })
      if (response.status === 503) {
        await response.body?.cancel()
        response = undefined
        await delay(500)
        continue
      }
      break
    } catch {
      await delay(500)
    }
  }

  if (!response) throw new Error('Void dev server did not become ready within 20 seconds.')
  if (response.status !== 200) throw new Error(`GET /api/blogs returned HTTP ${response.status}.`)
  await response.body?.cancel()
  console.info('Void local smoke check passed: GET /api/blogs returned HTTP 200.')
} finally {
  if (child.exitCode === null) {
    child.kill('SIGTERM')
    await Promise.race([once(child, 'exit'), delay(10000)])
    if (child.exitCode === null) child.kill('SIGKILL')
  }
}
