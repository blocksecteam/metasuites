import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import {
  OPENSEA_PAGES,
  type OPENSEA_PAGE_NAMES,
  GET_NFT_RARITY_RANK
} from '@common/constants'
import type { NFTRarityRankRes, NFTRarityRankReq } from '@common/api/types'
import { RarityLabel } from '@common/components'

const genRarityRankLabel = async (
  pageName: (typeof OPENSEA_PAGE_NAMES)[number]
) => {
  switch (pageName) {
    case OPENSEA_PAGES.COLLECTION.name:
      {
        const assetsItemEls = document.querySelectorAll<HTMLElement>(
          "article > a[href^='/assets']"
        )
        if (!assetsItemEls.length) return
        const tagsList: HTMLElement[] = []
        let assets: NFTRarityRankReq = { address: '', tokenIds: [] }
        for (const el of assetsItemEls) {
          const idContainerEl = el.querySelector<HTMLElement>(
            'div:nth-of-type(3) > div > div'
          )
          if (idContainerEl?.childElementCount === 1) {
            tagsList.push(el)
            const [, , address, id] =
              el
                ?.getAttribute('href')
                ?.split('/')
                ?.filter(i => !!i) ?? []
            assets = { address, tokenIds: [...assets.tokenIds, id] }
          }
        }
        if (assets.tokenIds.length) {
          const res = await chromeEvent.emit<
            typeof GET_NFT_RARITY_RANK,
            NFTRarityRankRes
          >(GET_NFT_RARITY_RANK, assets)

          if (res?.success && res.data) {
            res.data.forEach(item => {
              tagsList.forEach(el => {
                const [, , , tokenId] =
                  el
                    ?.getAttribute('href')
                    ?.split('/')
                    ?.filter(i => !!i) ?? []
                if (tokenId === item.tokenId) {
                  const idContainerEl = el.querySelector<HTMLElement>(
                    'div:nth-of-type(3) > div > div'
                  )
                  if (idContainerEl?.childElementCount === 1) {
                    const rootEl = document.createElement('div')
                    idContainerEl?.appendChild(rootEl)
                    createRoot(rootEl).render(<RarityLabel data={item} />)
                  }
                }
              })
            })
          }
        }
      }
      break
    case OPENSEA_PAGES.ASSETS.name:
      {
        const containerEl = $<HTMLElement>('section.item--counts')
        const [, , address, id] =
          window.location.pathname?.split('/')?.filter(i => !!i) ?? []

        const mrl = $('#__metadock-rarity-label__')

        const rootEl = $('<div></div>')

        if (!mrl.length) {
          // Avoid duplicate rendering
          rootEl.attr('id', '__metadock-rarity-label__')
          containerEl.prepend(rootEl)
          if (address && id) {
            const res = await chromeEvent.emit<
              typeof GET_NFT_RARITY_RANK,
              NFTRarityRankRes
            >(GET_NFT_RARITY_RANK, { address, tokenIds: [id] })

            if (res?.success && res.data && res.data.length) {
              rootEl.css('margin-right', '24px')
              createRoot(rootEl[0]).render(<RarityLabel data={res.data[0]} />)
            }
          }
        }
      }
      break
  }
}

export default genRarityRankLabel
