export function safeHttpsUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password ? url : null
  } catch {
    return null
  }
}

export function getVideoEmbedUrl(value: string) {
  const url = safeHttpsUrl(value)
  if (!url) return null

  const host = url.hostname.toLowerCase()
  if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) {
    const videoId = url.pathname === '/watch'
      ? url.searchParams.get('v')
      : url.pathname.match(/^\/(?:embed|shorts)\/([A-Za-z0-9_-]{11})\/?$/)?.[1]
    return videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId) ? `https://www.youtube-nocookie.com/embed/${videoId}` : null
  }
  if (host === 'youtu.be') {
    const videoId = url.pathname.match(/^\/([A-Za-z0-9_-]{11})\/?$/)?.[1]
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null
  }
  if (['vimeo.com', 'www.vimeo.com'].includes(host)) {
    const videoId = url.pathname.match(/^\/(\d+)\/?$/)?.[1]
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null
  }
  return null
}

export function isSafeContentImageUrl(value: string) {
  return /^\/api\/uploads\/uploads\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\.webp$/.test(value)
}

export function isSafeContentLink(value: string) {
  return /^mailto:[^\s<>]+$/i.test(value) || Boolean(safeHttpsUrl(value))
}
