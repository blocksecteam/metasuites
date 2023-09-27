import { debounce } from 'lodash-es'

import '@common/styles/inject.common'
import { getPageName, isAllowed, insertScript } from '@common/utils'
import { OPENSEA_PAGES, GraphqlEventIds } from '@common/constants'
import { store } from '@src/store'

import {
  initCollectionPageScript,
  initUserPageScript,
  initAssetsPageScript
} from './page-scripts'

const runContentScript = debounce(async () => {
  const supportWebList = await store.get('supportWebList')

  const allowed = isAllowed(Object.values(supportWebList))

  if (!allowed) return

  const pageName = getPageName()

  switch (pageName) {
    case OPENSEA_PAGES.COLLECTION.name:
      initCollectionPageScript()
      break
    case OPENSEA_PAGES.USER.name:
      initUserPageScript()
      break
    case OPENSEA_PAGES.ASSETS.name:
      initAssetsPageScript()
      break
  }
}, 300)

const initObserver = () => {
  const pageName = getPageName()
  const dataHolder = document.createElement('div')
  dataHolder.setAttribute('id', 'myDataHolder')
  document.body.appendChild(dataHolder)
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type == 'attributes') {
        const requestBody = (mutation.target as HTMLElement).getAttribute(
          'reqBody'
        )
        if (requestBody) {
          try {
            const bodyJson = JSON.parse(requestBody)
            switch (pageName) {
              case OPENSEA_PAGES.COLLECTION.name:
                runContentScript()
                break
              case OPENSEA_PAGES.USER.name:
                {
                  if (
                    [GraphqlEventIds.EventHistoryPaginationQuery].includes(
                      bodyJson.id
                    )
                  ) {
                    runContentScript()
                  }
                }
                break
              case OPENSEA_PAGES.ASSETS.name:
                {
                  if (
                    [
                      GraphqlEventIds.OrdersPaginationQuery,
                      GraphqlEventIds.EventHistoryPaginationQuery
                    ].includes(bodyJson.id)
                  ) {
                    runContentScript()
                  }
                }
                break
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
    })
  })

  observer.observe(dataHolder, {
    attributes: true
  })
}

export const initOpensea = () => {
  initObserver()

  runContentScript()

  insertScript('opensea-fetch-interceptor')
}
