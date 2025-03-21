import type { WatcherCallback } from 'chrome-extension-core'

import { store, type StorageInfo } from '@src/store'
import { PrivateLabelSource } from '@common/constants'
import { formatAddress } from '@common/utils'
import { getChainTypeFromAddress } from '@common/utils/chain'

const DB_NAME = 'localforage'
const STORE_NAME = 'keyvaluepairs'
const CUSTOM_EVENT_NAME = 'metasuites:syncLabels'
const MD_PRIVATE_LABELS_KEY = 'MD_PRIVATE_LABELS'

export const initPrivateLabelsSync = async () => {
  if (!location.pathname.startsWith('/explorer')) {
    return
  }

  const options = await store.get('options')
  const { syncPhalconLabels: enabled } = options

  try {
    const isIndexDBAvailable = await checkIndexDBAvailability()
    if (!isIndexDBAvailable) {
      return
    }

    if (enabled) {
      await syncToPe()
      await syncFromPe()
    } else {
      await removePrivateLabelsFromDb()
    }
  } catch (error) {
    console.error('sync private labels failed', error)
  }

  setupEventListeners()
}

async function checkIndexDBAvailability(): Promise<boolean> {
  if (!window.indexedDB) {
    return false
  }

  try {
    return new Promise(resolve => {
      const openRequest = indexedDB.open(DB_NAME)

      openRequest.onerror = () => {
        resolve(false)
      }

      openRequest.onsuccess = event => {
        const db = (event.target as IDBOpenDBRequest).result
        const hasStore = db.objectStoreNames.contains(STORE_NAME)
        db.close()
        resolve(hasStore)
      }
    })
  } catch (error) {
    return false
  }
}

async function syncFromPe(): Promise<boolean> {
  if (!location.pathname.startsWith('/explorer')) {
    return false
  }

  try {
    const openRequest = indexedDB.open(DB_NAME)

    return new Promise(resolve => {
      openRequest.onerror = () => {
        resolve(false)
      }

      openRequest.onsuccess = async event => {
        const db = (event.target as IDBOpenDBRequest).result

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.close()
          resolve(false)
          return
        }

        const transaction = db.transaction([STORE_NAME], 'readonly')
        const objectStore = transaction.objectStore(STORE_NAME)
        const request = objectStore.get('CUSTOM_MAP_LIST')

        request.onerror = () => {
          db.close()
          resolve(false)
        }

        request.onsuccess = async () => {
          if (!request.result) {
            db.close()
            resolve(false)
            return
          }

          try {
            const peLabels = JSON.parse(request.result) as Array<{
              type: string
              value: string
              label: string
              color: string
              address: string
            }>

            const currentLabels = await store.get('privateLabels')
            let hasChanges = false

            const existingAddresses = new Set<string>()

            const extDeletedAddresses = new Set<string>()

            const peDeletedAddresses = new Set<string>()

            Object.entries(currentLabels).forEach(([, item]) => {
              const address = item.address
              const addressKey = address.toLowerCase()

              if (item.deleted) {
                extDeletedAddresses.add(addressKey)
              } else {
                existingAddresses.add(addressKey)
              }
            })

            peLabels.forEach(item => {
              if (item.type === 'account') {
                const address = item.address
                const addressKey = address.toLowerCase()

                if (!item.label && item.address) {
                  peDeletedAddresses.add(addressKey)
                }
              }
            })

            const seenPeAddresses = new Set<string>()

            peLabels.forEach(item => {
              if (item.type === 'account') {
                const chainType = getChainTypeFromAddress(item.address)

                const formattedAddress = formatAddress(item.address)

                const addressKey = item.address.toLowerCase()

                if (seenPeAddresses.has(addressKey)) {
                  return
                }
                seenPeAddresses.add(addressKey)

                const key = `${chainType}-${formattedAddress}`

                const existingLabel = currentLabels[key]

                if (
                  !existingLabel ||
                  existingLabel.deleted ||
                  existingLabel.source === PrivateLabelSource.PE
                ) {
                  if (item.label) {
                    currentLabels[key] = {
                      address: formattedAddress,
                      label: item.label,
                      chainType,
                      source: PrivateLabelSource.PE
                    }
                    hasChanges = true
                  }
                }
              }
            })

            if (hasChanges) {
              await store.set('privateLabels', currentLabels)
            }
            db.close()
            resolve(hasChanges)
          } catch (e) {
            db.close()
            resolve(false)
          }
        }
      }
    })
  } catch (error) {
    return false
  }
}

async function syncToPe(): Promise<boolean> {
  if (!location.pathname.startsWith('/explorer')) {
    return false
  }

  try {
    const isAvailable = await checkIndexDBAvailability()
    if (!isAvailable) {
      return false
    }

    const openRequest = indexedDB.open(DB_NAME)

    return new Promise(resolve => {
      openRequest.onerror = () => {
        resolve(false)
      }

      openRequest.onsuccess = async event => {
        const db = (event.target as IDBOpenDBRequest).result

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.close()
          resolve(false)
          return
        }

        const currentLabels = await store.get('privateLabels')

        if (Object.keys(currentLabels).length === 0) {
          db.close()
          resolve(false)
          return
        }

        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const objectStore = transaction.objectStore(STORE_NAME)

        const formattedLabels: Array<{
          type: string
          value: string
          label: string
          color: string
          address: string
        }> = []

        const seenExtAddresses = new Set<string>()

        Object.values(currentLabels).forEach(item => {
          if (!item.deleted && item.source !== PrivateLabelSource.PE) {
            const formattedAddress = item.address.toLowerCase()
            const addressKey = formattedAddress.toLowerCase()

            if (seenExtAddresses.has(addressKey)) {
              return
            }
            seenExtAddresses.add(addressKey)

            formattedLabels.push({
              type: 'account',
              value: formattedAddress,
              label: item.label,
              color: '',
              address: formattedAddress
            })
          }
        })

        if (formattedLabels.length === 0) {
          db.close()
          resolve(false)
          return
        }

        const putRequest = objectStore.put(
          formattedLabels,
          MD_PRIVATE_LABELS_KEY
        )

        putRequest.onerror = () => {
          db.close()
          resolve(false)
        }

        putRequest.onsuccess = () => {
          db.close()
          resolve(true)
        }
      }
    })
  } catch (error) {
    return false
  }
}

async function removePrivateLabelsFromDb(): Promise<boolean> {
  if (!location.pathname.startsWith('/explorer')) {
    return false
  }

  try {
    const isAvailable = await checkIndexDBAvailability()
    if (!isAvailable) {
      return false
    }

    const openRequest = indexedDB.open(DB_NAME)

    return new Promise(resolve => {
      openRequest.onerror = () => {
        resolve(false)
      }

      openRequest.onsuccess = async event => {
        const db = (event.target as IDBOpenDBRequest).result

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.close()
          resolve(false)
          return
        }

        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const objectStore = transaction.objectStore(STORE_NAME)

        const deleteRequest = objectStore.delete(MD_PRIVATE_LABELS_KEY)

        deleteRequest.onerror = () => {
          db.close()
          resolve(false)
        }

        deleteRequest.onsuccess = () => {
          db.close()
          resolve(true)
        }
      }
    })
  } catch (error) {
    return false
  }
}

function setupEventListeners() {
  const storeWatcher: WatcherCallback<StorageInfo> = (
    data: Record<keyof StorageInfo, chrome.storage.StorageChange>
  ) => {
    if (data['privateLabels']) {
      try {
        checkIndexDBAvailability().then(async isAvailable => {
          if (isAvailable) {
            const options = await store.get('options')
            const { syncPhalconLabels: enabled } = options
            if (enabled) {
              await syncToPe()
            } else {
              await removePrivateLabelsFromDb()
            }
          }
        })
      } catch (error) {
        console.error('sync private labels failed', error)
      }
    }
  }

  store.addWatcher(storeWatcher)

  const syncEvent = new CustomEvent(CUSTOM_EVENT_NAME)
  window.addEventListener(CUSTOM_EVENT_NAME, async () => {
    try {
      const isAvailable = await checkIndexDBAvailability()
      if (!isAvailable) {
        return
      }

      const options = await store.get('options')
      const { syncPhalconLabels: enabled } = options

      if (enabled) {
        await syncFromPe()
        await syncToPe()
      } else {
        await removePrivateLabelsFromDb()
      }
    } catch (error) {
      console.error('sync private labels failed', error)
    }
  })

  if (window) {
    // @ts-ignore
    window.metasuites = window.metasuites || {}
    // @ts-ignore
    window.metasuites.triggerSyncLabels = () => {
      window.dispatchEvent(syncEvent)
    }
  }
}
