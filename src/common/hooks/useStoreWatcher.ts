import type { WatcherCallback } from 'chrome-extension-core'
import { useEffect } from 'react'

import type { StorageInfo } from '@src/store'
import { store } from '@src/store'

export default function useStoreWatcher(
  callback: WatcherCallback<StorageInfo>,
  deps?: (keyof StorageInfo)[]
) {
  useEffect(() => {
    const storeWatcher = (
      data: Record<keyof StorageInfo, chrome.storage.StorageChange>
    ) => {
      const dataKeys = Object.keys(data)
      if (!deps || deps.some(val => dataKeys.includes(val))) {
        callback(data)
      }
    }
    store.addWatcher(storeWatcher)
    return () => {
      store.removeWatcher(storeWatcher)
    }
  }, [callback, deps])
}
