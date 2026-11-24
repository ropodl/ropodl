import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const port = 4317
const smokePaths = [
  '/api/blogs',
  '/api/blog-categories',
  '/api/blog-tags',
  '/api/project-types',
  '/api/projects',
  '/api/auth/get-session',
  '/api/pages/about',
  '/api/search?q=void-smoke'
]
const child = spawn(process.execPath, ['scripts/void-command.mjs', 'dev', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: root,
  stdio: 'inherit'
})

try {
  let ready = false
  for (let attempt = 0; attempt < 40; attempt++) {
    if (child.exitCode !== null) throw new Error(`Void dev server exited early with code ${child.exitCode}.`)
    try {
      const response = await fetch(`http://127.0.0.1:${port}${smokePaths[0]}`, { signal: AbortSignal.timeout(1500) })
      await response.body?.cancel()
      if (response.status === 503) {
        await delay(500)
        continue
      }
      if (response.status !== 200) throw new Error(`GET ${smokePaths[0]} returned HTTP ${response.status}.`)
      ready = true
      break
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('GET ')) throw error
      await delay(500)
    }
  }

  if (!ready) throw new Error('Void dev server did not become ready within 20 seconds.')

  for (const path of smokePaths) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`, { signal: AbortSignal.timeout(10000) })
    await response.body?.cancel()
    if (response.status !== 200) throw new Error(`GET ${path} returned HTTP ${response.status}.`)
    console.info(`Void local smoke check passed: GET ${path} returned HTTP 200.`)
  }
} finally {
  if (child.exitCode === null) {
    child.kill('SIGTERM')
    await Promise.race([once(child, 'exit'), delay(10000)])
    if (child.exitCode === null) child.kill('SIGKILL')
  }
}
