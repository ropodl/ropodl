export interface ArticleBookmark {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  savedAt: number
}

const storageKey = 'ropodl:article-bookmarks:v1'

function isArticleBookmark(value: unknown): value is ArticleBookmark {
  if (!value || typeof value !== 'object') return false
  const bookmark = value as Partial<ArticleBookmark>
  return typeof bookmark.slug === 'string'
    && typeof bookmark.title === 'string'
    && typeof bookmark.summary === 'string'
    && (typeof bookmark.imageUrl === 'string' || bookmark.imageUrl === null)
    && typeof bookmark.savedAt === 'number'
}

export function useArticleBookmarks() {
  const bookmarks = useState<ArticleBookmark[]>('article-bookmarks', () => [])
  const ready = useState('article-bookmarks-ready', () => false)
  const errorMessage = useState('article-bookmarks-error', () => '')

  function loadBookmarks() {
    if (ready.value) return
    try {
      bookmarks.value = []
      const storedValue = localStorage.getItem(storageKey)
      if (storedValue) {
        const parsed: unknown = JSON.parse(storedValue)
        if (!Array.isArray(parsed)) throw new TypeError('Saved articles data is invalid.')
        bookmarks.value = parsed.filter(isArticleBookmark)
      }
      ready.value = true
      errorMessage.value = ''
    } catch (error) {
      console.error('Could not load saved articles:', error)
      errorMessage.value = 'Saved articles could not be loaded from this browser.'
      ready.value = true
    }
  }

  function saveBookmarks(nextBookmarks: ArticleBookmark[]) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextBookmarks))
      bookmarks.value = nextBookmarks
      errorMessage.value = ''
    } catch (error) {
      console.error('Could not save articles in this browser:', error)
      errorMessage.value = 'Your browser could not save this article. Check local storage settings and try again.'
    }
  }

  function isBookmarked(slug: string) {
    return bookmarks.value.some(bookmark => bookmark.slug === slug)
  }

  function toggleBookmark(article: Omit<ArticleBookmark, 'savedAt'>) {
    if (!ready.value) loadBookmarks()
    const nextBookmarks = isBookmarked(article.slug)
      ? bookmarks.value.filter(bookmark => bookmark.slug !== article.slug)
      : [{ ...article, savedAt: Date.now() }, ...bookmarks.value]
    saveBookmarks(nextBookmarks)
  }

  function onStorage(event: StorageEvent) {
    if (event.key !== storageKey && event.key !== null) return
    ready.value = false
    loadBookmarks()
  }

  onMounted(() => {
    loadBookmarks()
    window.addEventListener('storage', onStorage)
  })
  onBeforeUnmount(() => window.removeEventListener('storage', onStorage))

  return { bookmarks, ready, errorMessage, isBookmarked, toggleBookmark }
}
