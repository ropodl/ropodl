import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }

    const paginationChanged = to.path === from.path
      && (to.query.page !== from.query.page || to.query.pageSize !== from.query.pageSize)

    if (to.path !== from.path || paginationChanged) {
      return {
        left: 0,
        top: 0,
        behavior: to.path !== from.path ? 'smooth' : 'instant'
      }
    }
  }
}
