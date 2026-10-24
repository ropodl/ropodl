import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

if (process.argv.includes('--remote')) {
  throw new Error('Demo content is local only. This script does not support remote D1 or R2.')
}

const wrangler = join(process.cwd(), 'node_modules', '.bin', process.platform === 'win32' ? 'wrangler.cmd' : 'wrangler')
const node = process.execPath
const directory = mkdtempSync(join(tmpdir(), 'project-demo-seed-'))
const sqlFile = join(directory, 'seed.sql')
const imageFile = join(directory, 'sample.png')
const mediaFromArg = process.argv.indexOf('--media-from')
const mediaFrom = mediaFromArg < 0 ? 1 : Number(process.argv[mediaFromArg + 1])
if (!Number.isInteger(mediaFrom) || mediaFrom < 1 || mediaFrom > 100) throw new Error('--media-from must be an integer from 1 to 100.')
const quote = value => `'${String(value).replaceAll('\'', '\'\'')}'`

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options })
  if (result.error) throw result.error
  if (result.status !== 0) {
    if (result.stdout) process.stderr.write(result.stdout)
    if (result.stderr) process.stderr.write(result.stderr)
    throw new Error(`${command} exited with status ${result.status}.`)
  }
  return result.stdout || ''
}

function findId(value) {
  if (Array.isArray(value)) {
    for (const item of value) {
      const id = findId(item)
      if (id) return id
    }
  } else if (value && typeof value === 'object') {
    if (typeof value.id === 'string') return value.id
    for (const item of Object.values(value)) {
      const id = findId(item)
      if (id) return id
    }
  }
  return null
}

try {
  run(wrangler, ['d1', 'migrations', 'apply', 'saroj-portfolio', '--local'], { stdio: 'inherit' })
  run(node, ['scripts/seed-admin.mjs'], { stdio: 'inherit' })

  const adminResult = run(wrangler, ['d1', 'execute', 'saroj-portfolio', '--local', '--json', '--command', 'SELECT id FROM user WHERE email = \'admin@example.com\' LIMIT 1'])
  const adminId = findId(JSON.parse(adminResult))
  if (!adminId) throw new Error('Could not find the local admin account after seeding it.')

  const now = Date.now()
  const statements = []
  const rows = (count, callback) => Array.from({ length: count }, (_, index) => callback(index + 1))
  const values = parts => parts.join(',\n')

  if (process.argv.includes('--clear')) {
    statements.push(`DELETE FROM blog_tag_links WHERE blogId LIKE 'demo-blog-%';`)
    statements.push(`DELETE FROM blog_category_links WHERE blogId LIKE 'demo-blog-%';`)
    statements.push(`DELETE FROM project_type_links WHERE projectId LIKE 'demo-project-%';`)
    statements.push(`DELETE FROM blogs WHERE id LIKE 'demo-blog-%';`)
    statements.push(`DELETE FROM projects WHERE id LIKE 'demo-project-%';`)
    statements.push(`DELETE FROM blog_categories WHERE id LIKE 'demo-category-%';`)
    statements.push(`DELETE FROM blog_tags WHERE id LIKE 'demo-tag-%';`)
    statements.push(`DELETE FROM project_types WHERE id LIKE 'demo-type-%';`)
    statements.push(`DELETE FROM contact_messages WHERE id LIKE 'demo-contact-%';`)
  } else {
    statements.push(`INSERT OR IGNORE INTO blog_categories (id, title, slug, description, createdAt, updatedAt) VALUES ${values(rows(100, i => `(${quote(`demo-category-${String(i).padStart(3, '0')}`)}, ${quote(`Demo category ${String(i).padStart(3, '0')}`)}, ${quote(`demo-category-${String(i).padStart(3, '0')}`)}, ${quote('Generated local demo category.')}, ${now}, ${now})`))};`)
    statements.push(`INSERT OR IGNORE INTO blog_tags (id, title, slug, createdAt, updatedAt) VALUES ${values(rows(100, i => `(${quote(`demo-tag-${String(i).padStart(3, '0')}`)}, ${quote(`Demo tag ${String(i).padStart(3, '0')}`)}, ${quote(`demo-tag-${String(i).padStart(3, '0')}`)}, ${now}, ${now})`))};`)
    statements.push(`INSERT OR IGNORE INTO project_types (id, title, slug, description, createdAt, updatedAt) VALUES ${values(rows(100, i => `(${quote(`demo-type-${String(i).padStart(3, '0')}`)}, ${quote(`Demo type ${String(i).padStart(3, '0')}`)}, ${quote(`demo-type-${String(i).padStart(3, '0')}`)}, ${quote('Generated local demo project type.')}, ${now}, ${now})`))};`)
    statements.push(`INSERT INTO blogs (id, title, slug, summary, content, imageKey, categoryId, status, createdAt, updatedAt, postFormat, formatUrl, quoteText, quoteCitation) VALUES ${values(rows(100, (i) => {
      const n = String(i).padStart(3, '0')
      const formats = {
        2: { postFormat: 'aside', summary: 'A short note from the local blog format preview.', content: '<p>This aside is a short note, separate from a full-length article.</p>' },
        3: { postFormat: 'gallery', summary: 'A gallery-format post with a pair of demo images.', content: `<div class="content-gallery"><img src="/api/uploads/uploads/${adminId}/demo-image-001.png" alt="First demo gallery image"><img src="/api/uploads/uploads/${adminId}/demo-image-002.png" alt="Second demo gallery image"></div><p>Gallery posts let images lead the story.</p>` },
        4: { postFormat: 'link', summary: 'A link-format post points readers to another page.', formatUrl: 'https://example.com/', content: '<p>This demo post highlights an external link.</p>' },
        5: { postFormat: 'image', summary: 'An image-format post centers its featured image.', content: '<p>The featured image is the focus of this post.</p>' },
        6: { postFormat: 'quote', summary: 'A quotation with an attribution.', quoteText: 'Great things are done by a series of small things brought together.', quoteCitation: 'Vincent van Gogh', content: '<p>This demo shows a quotation format and optional citation.</p>' },
        7: { postFormat: 'status', summary: 'A quick status update from the demo blog.', content: '' },
        8: { postFormat: 'video', summary: 'A video-format post with a YouTube embed.', formatUrl: 'https://youtu.be/dQw4w9WgXcQ', content: '<p>The video is embedded from an approved provider.</p>' },
        9: { postFormat: 'audio', summary: 'An audio-format post with a playable demo track.', formatUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', content: '<p>Use the audio controls to play the demo track.</p>' },
        10: { postFormat: 'chat', summary: 'A short conversation shown as a transcript.', content: '<p><strong>Visitor:</strong> What is a chat post?</p><p><strong>Author:</strong> A simple way to publish a conversation or transcript.</p>' }
      }
      const format = formats[i] || { postFormat: 'standard', summary: 'Generated local demo content for admin preview.', content: `<p>Sample blog content ${n} for local admin preview.</p>` }
      const imageKey = i === 5 ? `uploads/${adminId}/demo-image-005.png` : null
      const status = i >= 2 && i <= 10 ? 'published' : i % 5 === 0 ? 'draft' : 'published'
      return `(${quote(`demo-blog-${n}`)}, ${quote(`Demo blog post ${n}`)}, ${quote(`demo-blog-post-${n}`)}, ${quote(format.summary)}, ${quote(format.content)}, ${imageKey ? quote(imageKey) : 'NULL'}, ${quote(`demo-category-${n}`)}, ${quote(status)}, ${now - i * 86400000}, ${now}, ${quote(format.postFormat)}, ${quote(format.formatUrl || '')}, ${quote(format.quoteText || '')}, ${quote(format.quoteCitation || '')})`
    }))} ON CONFLICT(id) DO UPDATE SET title = excluded.title, slug = excluded.slug, summary = excluded.summary, content = excluded.content, imageKey = excluded.imageKey, categoryId = excluded.categoryId, status = excluded.status, updatedAt = excluded.updatedAt, postFormat = excluded.postFormat, formatUrl = excluded.formatUrl, quoteText = excluded.quoteText, quoteCitation = excluded.quoteCitation;`)
    statements.push(`INSERT OR IGNORE INTO projects (id, title, slug, summary, content, imageKey, typeId, status, createdAt, updatedAt) VALUES ${values(rows(100, (i) => {
      const n = String(i).padStart(3, '0')
      return `(${quote(`demo-project-${n}`)}, ${quote(`Demo project ${n}`)}, ${quote(`demo-project-${n}`)}, ${quote('Generated local demo content for admin preview.')}, ${quote(`<p>Sample project content ${n} for local admin preview.</p>`)}, NULL, ${quote(`demo-type-${n}`)}, ${quote(i % 5 === 0 ? 'draft' : 'published')}, ${now - i * 86400000}, ${now})`
    }))};`)
    statements.push(`INSERT OR IGNORE INTO blog_category_links (blogId, categoryId) VALUES ${values(rows(100, i => `(${quote(`demo-blog-${String(i).padStart(3, '0')}`)}, ${quote(`demo-category-${String(i).padStart(3, '0')}`)})`))};`)
    statements.push(`INSERT OR IGNORE INTO blog_tag_links (blogId, tagId) VALUES ${values(rows(100, i => `(${quote(`demo-blog-${String(i).padStart(3, '0')}`)}, ${quote(`demo-tag-${String(i).padStart(3, '0')}`)})`))};`)
    statements.push(`INSERT OR IGNORE INTO project_type_links (projectId, typeId) VALUES ${values(rows(100, i => `(${quote(`demo-project-${String(i).padStart(3, '0')}`)}, ${quote(`demo-type-${String(i).padStart(3, '0')}`)})`))};`)
    statements.push(`INSERT OR IGNORE INTO contact_messages (id, name, email, subject, message, status, createdAt, updatedAt) VALUES ${values(rows(100, (i) => {
      const n = String(i).padStart(3, '0')
      return `(${quote(`demo-contact-${n}`)}, ${quote(`Demo Contact ${n}`)}, ${quote(`demo-contact-${n}@example.test`)}, ${quote(`Demo message ${n}`)}, ${quote(`Sample contact message ${n} for local admin preview.`)}, ${quote(['new', 'read', 'replied', 'archived'][i % 4])}, ${now - i * 3600000}, ${now})`
    }))};`)
  }

  writeFileSync(sqlFile, statements.join('\n'), { mode: 0o600 })
  run(wrangler, ['d1', 'execute', 'saroj-portfolio', '--local', '--file', sqlFile], { stdio: 'inherit' })

  if (process.argv.includes('--clear')) {
    for (let i = 1; i <= 100; i++) {
      const key = `uploads/${adminId}/demo-image-${String(i).padStart(3, '0')}.png`
      run(wrangler, ['r2', 'object', 'delete', `saroj-portfolio-uploads/${key}`, '--local'], { stdio: 'ignore' })
    }
    console.info('Removed local demo records and images.')
  } else {
    writeFileSync(imageFile, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l3sAAAAASUVORK5CYII=', 'base64'))
    for (let i = mediaFrom; i <= 100; i++) {
      const key = `uploads/${adminId}/demo-image-${String(i).padStart(3, '0')}.png`
      run(wrangler, ['r2', 'object', 'put', `saroj-portfolio-uploads/${key}`, '--local', '--file', imageFile, '--content-type', 'image/png'], { stdio: 'ignore' })
    }
    console.info('Seeded 100 local demo records for each admin content collection and 100 local media files.')
  }
} finally {
  rmSync(directory, { recursive: true, force: true })
}
