import localForage from 'localforage'

export function setLocalForage (key, data) {
  return localForage.setItem(key, data)
}

export function getLocalForage (key) {
  return localForage.getItem(key)
}

export function removeLocalForage (key) {
  return localForage.removeItem(key)
}

export function clearLocalForage () {
  return localForage.clear()
}
