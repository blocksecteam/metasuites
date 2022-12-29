const originalFetch = window.fetch
window.fetch = async function (resource, config) {
  const response = await originalFetch(resource, config)

  if (response.ok && response.status === 200) {
    if (resource === '/__api/graphql/') {
      try {
        const req = JSON.parse(config.body)
        /** filter polling requests */
        const isPollingQuery = req.id.indexOf('PollingQuery') !== -1
        if (!isPollingQuery) {
          const dataHolderEl = document.querySelector('#myDataHolder')
          if (dataHolderEl) dataHolderEl.setAttribute('reqBody', config.body)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
  return response
}
