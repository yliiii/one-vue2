export function getGlobalState(key) {
  if (key) {
    if (window.__GDATA__ && (key in window.__GDATA__)) return window.__GDATA__[key]
    return undefined
  } 

  return window.__GDATA__
}