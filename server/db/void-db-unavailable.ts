export const db = new Proxy({}, {
  get() {
    throw new Error('The Void D1 adapter is only available when building with the Void Nitro integration.')
  }
})
