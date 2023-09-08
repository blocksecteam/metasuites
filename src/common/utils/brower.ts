import browser from 'webextension-polyfill'
export const openInternalPage = (name: string, target = '_blank') => {
  const path = `src/pages/${name}/index.html`
  window.open(getURL(path), target)
}

export const getURL = (path: string) => {
  return browser.runtime.getURL(path)
}

export const getImageUrl = (name: string, suffix = 'png') => {
  if (name.startsWith('/')) {
    return getURL(`/src/assets/${name.substring(1)}.${suffix}`)
  }
  return getURL(`/src/assets/images/${name}.${suffix}`)
}

export const getScriptUrl = (name: string) => {
  return getURL(`/src/assets/js/${name}.js`)
}

export const sendMessage = async (message: string) => {
  return browser.runtime.sendMessage(message)
}

export const getCurrentTab = async () => {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await browser.tabs.query(queryOptions)
  return tab
}

export const reloadCurrentTab = async () => {
  const tab = await getCurrentTab()
  tab?.id && browser.tabs.reload(tab.id)
}

export const createTab = async (url: string) => {
  await browser.tabs.create({ url: url })
}
