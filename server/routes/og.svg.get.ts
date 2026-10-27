import { getCloudflareEnv } from '../utils/cloudflare'

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&apos;' })[char]!)
}

async function embeddedAsset(event: Parameters<typeof getCloudflareEnv>[0], path: string, mimeType: string) {
  const assets = getCloudflareEnv(event).ASSETS
  if (!assets) return ''
  const response = await assets.fetch(new Request(new URL(path, getRequestURL(event).origin)))
  if (!response.ok) return ''
  const bytes = new Uint8Array(await response.arrayBuffer())
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return `data:${mimeType};base64,${btoa(binary)}`
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const rawTitle = String(query.title || 'Saroj Poudel').slice(0, 120)
  const description = escapeXml(String(query.description || 'Full-stack developer and designer').slice(0, 180))
  const isHomeTitle = /^Saroj Poudel\s*[—|:-]/i.test(rawTitle)
  const title = escapeXml(isHomeTitle ? 'Saroj Poudel' : rawTitle)
  const role = escapeXml(isHomeTitle ? rawTitle.replace(/^Saroj Poudel\s*[—|:-]\s*/i, '').replace(/\s*&\s*/g, ' and ') : '')
  const [avatarData, faviconData] = await Promise.all([
    embeddedAsset(event, '/saroj-poudel.webp', 'image/webp'),
    embeddedAsset(event, '/icon.svg', 'image/svg+xml')
  ])
  const avatar = avatarData
    ? `<image href="${avatarData}" x="942" y="102" width="136" height="136" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarClip)"/>`
    : `<text x="1010" y="181" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="34" font-weight="700">SP</text>`
  const favicon = faviconData ? `<image href="${faviconData}" x="1040" y="200" width="44" height="44" preserveAspectRatio="xMidYMid meet"/>` : '<text x="1062" y="229" text-anchor="middle" fill="#ff777c" font-family="Arial,sans-serif" font-size="18" font-weight="700">R</text>'

  setHeader(event, 'Content-Type', 'image/svg+xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#101115"/><stop offset="1" stop-color="#241719"/></linearGradient><radialGradient id="glow"><stop stop-color="#ff656b" stop-opacity=".25"/><stop offset="1" stop-color="#ff656b" stop-opacity="0"/></radialGradient><clipPath id="avatarClip"><circle cx="1010" cy="170" r="68"/></clipPath></defs><rect width="1200" height="630" fill="url(#bg)"/><circle cx="1050" cy="80" r="440" fill="url(#glow)"/><rect x="70" y="70" width="1060" height="490" rx="32" fill="none" stroke="#ffffff" stroke-opacity=".12"/><text x="120" y="150" fill="#ff777c" font-family="Arial,sans-serif" font-size="22" letter-spacing="6">ROPODL.COM</text><circle cx="1010" cy="170" r="74" fill="#ff777c" fill-opacity=".22"/>${avatar}${favicon}<foreignObject x="120" y="210" width="800" height="120"><div xmlns="http://www.w3.org/1999/xhtml" style="color:#f6f4f4;font-family:Arial,sans-serif;font-size:${isHomeTitle ? 54 : 46}px;font-weight:700;line-height:1.15;max-height:112px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${title}</div></foreignObject>${role ? `<foreignObject x="120" y="335" width="820" height="65"><div xmlns="http://www.w3.org/1999/xhtml" style="color:#ff8589;font-family:Arial,sans-serif;font-size:31px;font-weight:600;line-height:1.2;max-height:58px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${role}</div></foreignObject>` : ''}<foreignObject x="120" y="${role ? 430 : 400}" width="930" height="100"><div xmlns="http://www.w3.org/1999/xhtml" style="color:#aaa7ae;font-family:Arial,sans-serif;font-size:23px;line-height:1.4;max-height:88px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical">${description}</div></foreignObject></svg>`
})
