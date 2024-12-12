import $ from 'jquery'
import { chromeEvent } from '@common/event'
import { POST_ADDRESS_TAGS } from '@common/constants'
import { pickSolanaAddress } from '@common/utils'

export const lazyLoad = (
  callback: () => void,
  inspector: string,
  isNegative = true,
  maxRetries = 60
) => {
  const loading = isNegative ? !$(inspector).length : !!$(inspector).length
  if (loading) {
    if (maxRetries > 0) {
      setTimeout(() => {
        lazyLoad(callback, inspector, isNegative, maxRetries - 1)
      }, 500)
    }
  } else {
    requestIdleCallback(() => {
      callback()
    })
  }
}

export const getNameTag = () => {
  const profile = $('.shadow-m > div:nth-of-type(2)')[1]
  const tokenNameLabel = $(profile)
    .find('> div:first-child > div:nth-of-type(1)')
    .text()
  if (tokenNameLabel.toLocaleLowerCase().indexOf('token name') > -1) {
    return $(profile)
      .find('> div:first-child > div:nth-of-type(2)')
      .text()
      .trim()
  }
  const publicNameLabel = $(profile)
    .find('> div:first-child > div:nth-of-type(1)')
    .text()
  if (publicNameLabel.toLocaleLowerCase().indexOf('public name') > -1) {
    return $(profile)
      .find('> div:first-child > div:nth-of-type(2)')
      .text()
      .trim()
  }
}

export const getTags = () => {
  const profile = $('.shadow-m > div:nth-of-type(2)')[1]
  const tagsLabel = $(profile)
    .find('> div:last-child > div:nth-of-type(1)')
    .text()
  if (tagsLabel.toLocaleLowerCase().indexOf('tags') > -1) {
    const container = $(profile).find(
      '> div:last-child > div:nth-of-type(2) > div  > div'
    )
    return container.map((index, el) => el.innerText.trim()).get()
  }
  return []
}

export const trigger = async () => {
  const address = pickSolanaAddress(window.location.pathname)
  console.log('trigger', address)
  if (!address) return
  await chromeEvent.emit<typeof POST_ADDRESS_TAGS>(POST_ADDRESS_TAGS, {
    chain: 'solana',
    address,
    labels: getTags(),
    nameTag: getNameTag()
  })
}
