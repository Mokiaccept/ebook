import Store from 'web-storage-cache'

const localStorage = new Store()

export function getLocalStorage (key) {
  return localStorage.get(key)
}

export function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}

export function removeLocalStorage (key) {
  return localStorage.delete(key)
}

export function clearLocalStorage () {
  return localStorage.clear()
}

export function getLocation (fileName) {
  return getLocalStorage(fileName + 'Location')
}

export function saveLocation (fileName, location) {
  return setLocalStorage(fileName + 'Location', location)
}

export function getDefaultTheme () {
  return getLocalStorage('defaultTheme')
}

export function saveDefaultTheme (theme) {
  return setLocalStorage('defaultTheme', theme)
}

export function getDefaultFontSize () {
  return getLocalStorage('defaultFontSize')
}

export function saveDefaultFontSize (defaultFontSize) {
  return setLocalStorage('defaultFontSize', defaultFontSize)
}

export function getShelf () {
  return JSON.parse(getLocalStorage('shelf'))
}

export function saveShelf (shelf) {
  return setLocalStorage('shelf', JSON.stringify(shelf))
}
