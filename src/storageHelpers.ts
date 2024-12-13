import { error, log } from "./helpers"

export const getStorageItem = async <T>(key: string): Promise<T | null> => {
  log(`getStorageItem getting key[${key}]`)
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.session.get([key], (result) => {
        log(`getStorageItem got key[${key}] result`, result[key])

        resolve(result[key] || null)
      })
    } catch (e) {
      error(`getStorageItem error: ${key}`, e)

      reject(e)
    }
  })
}

export const setStorageItem = async <T>(
  key: string,
  value: T
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.session.set({ [key]: value }, () => {
        log(`setStorageItem setting key[${key}] with value`, value)

        resolve()
      })
    } catch (e) {
      error(`setStorageItem error: ${key} ${value}`, e)
      reject(e)
    }
  })
}
