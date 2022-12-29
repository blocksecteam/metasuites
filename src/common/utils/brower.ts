export const openInternalPage = (name: string, target = '_blank') => {
  const path = `src/pages/${name}/index.html`
  window.open(getURL(path), target)
}

export const openOptionsPage = () => {
  chrome.runtime.openOptionsPage()
}

export const getURL = (path: string) => {
  return chrome.runtime.getURL(path)
}

export const getImageUrl = (name: string, suffix = 'png') => {
  return getURL(`/src/assets/images/${name}.${suffix}`)
}

export const getScriptUrl = (name: string) => {
  return getURL(`/src/assets/js/${name}.js`)
}

export const sendMessage = async (message: string) => {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(message, response => {
      resolve(response)
    })
  })
}

export const queryTabs = async (queryInfo: chrome.tabs.QueryInfo) => {
  if (typeof chrome === 'undefined' || !chrome.tabs) {
    return []
  }

  return new Promise<chrome.tabs.Tab[]>(resolve => {
    chrome.tabs.query(queryInfo || {}, tabs => {
      resolve(tabs)
    })
  })
}

export const sendMessageToTab = async (tabID: number, message: string) => {
  return new Promise(resolve => {
    chrome.tabs.sendMessage(tabID, message, response => {
      resolve(response)
    })
  })
}

export const sendMessageToTabs = async (
  query: chrome.tabs.QueryInfo,
  message: string
) => {
  const tabs = await queryTabs(query)
  return Promise.all(
    tabs.map(
      tab => typeof tab.id === 'number' && sendMessageToTab(tab.id, message)
    )
  )
}

export const getCurrentTab = async () => {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

export const reloadCurrentTab = async () => {
  const tab = await getCurrentTab()
  tab?.id && chrome.tabs.reload(tab.id)
}

export const createTab = async (url: string) => {
  await chrome.tabs.create({ url: url })
}
