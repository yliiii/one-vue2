export function getWrappedPromise() {
  let wrappedPromise = {}
  let promise = new Promise((resolve, reject) => {
    wrappedPromise.resolve = resolve
    wrappedPromise.reject = reject
  })

  wrappedPromise.then = promise.then.bind(promise)
  wrappedPromise.catch = promise.catch.bind(promise)
  wrappedPromise.promise = promise // e.g. if you want to provide somewhere only promise, without .resolve/.reject/.catch methods

  return wrappedPromise
}