import { getRequestURL, sendRedirect, setHeader } from 'h3'

// www.ropodl.com is routed to this Worker too; send it to the apex so there's one indexed copy.
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (url.hostname !== 'www.ropodl.com') return
  url.hostname = 'ropodl.com'
  // The edge cache doesn't key on host, so a cached redirect would be served for the apex URL too.
  setHeader(event, 'Cache-Control', 'private, no-store')
  setHeader(event, 'CDN-Cache-Control', 'no-store')
  return sendRedirect(event, url.toString(), 301)
})
