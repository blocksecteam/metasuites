import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import $ from 'jquery'

import { convertUTCDateToLocalDate, validOrigin } from '@common/utils'
import { ETHERSCAN_PAGES, DATE_STANDARD_FORMAT_REG } from '@common/constants'
import { widthScanV2Tooltip } from '@common/hoc'

dayjs.extend(utc)

/**
 * The switching function of this time display on the scan website is judged according to the string,
 * so the innerText cannot be directly modified，otherwise, the click function will fail
 * Solution: Create a new parent element for him, and then add a child element,
 * position it on the original element (for triggering the click event), and the new child element is used to display the time zone
 */
const replaceInkTxAgeDateTime = (lnkAgeDateTimeEls: HTMLElement[]) => {
  for (let i = 0; i < lnkAgeDateTimeEls.length; i++) {
    const lnkAgeDateTimeEl = lnkAgeDateTimeEls[i]
    const parent = document.createElement('div')
    parent.style.position = 'relative'
    lnkAgeDateTimeEl.parentNode?.replaceChild(parent, lnkAgeDateTimeEl)
    lnkAgeDateTimeEl.setAttribute('style', 'position: absolute; opacity: 0')
    parent.appendChild(lnkAgeDateTimeEl)
    const referenceChild = document.createElement('a')
    referenceChild.setAttribute('href', 'javascript:;')
    referenceChild.innerText = lnkAgeDateTimeEl.innerText.replace(
      /(?<=\()(.+?)(?=\))/,
      'local time'
    )
    lnkAgeDateTimeEl.onclick = () => {
      referenceChild.innerText =
        lnkAgeDateTimeEl.innerText === 'Age'
          ? lnkAgeDateTimeEl.innerText
          : lnkAgeDateTimeEl.innerText.replace(
              /(?<=\()(.+?)(?=\))/,
              'local time'
            )
    }
    parent.appendChild(referenceChild)
  }
}

/** Replace the tip content in age mode */
const replaceAgeElsTipContent = (ageEls?: NodeListOf<HTMLElement>) => {
  const _ageEls =
    ageEls ??
    document.querySelectorAll<HTMLElement>('.showAge > span[data-bs-title]')
  for (let i = 0; i < _ageEls.length; i++) {
    const el = widthScanV2Tooltip(_ageEls[i])
    const dateUTC = el.getAttribute('data-bs-title')

    if (dateUTC && DATE_STANDARD_FORMAT_REG.test(dateUTC)) {
      const localDate = dayjs.utc(dateUTC).local().format('YYYY-MM-DD HH:mm:ss')
      el.setAttribute('data-bs-title', localDate)
    }
  }
}

/** Replace the content in date mode */
const replaceDateElsContent = (dateEls?: NodeListOf<HTMLElement>) => {
  const _dateEls =
    dateEls ??
    document.querySelectorAll<HTMLElement>('.showDate > span[data-bs-title]')
  for (let i = 0; i < _dateEls.length; i++) {
    const el = _dateEls[i]
    const dateUTC = el.innerText

    if (dateUTC && DATE_STANDARD_FORMAT_REG.test(dateUTC)) {
      el.innerText = convertUTCDateToLocalDate(dateUTC)
    }
  }
}

/** UTC date to local date */
const convertUTC2locale = (pageName: string) => {
  switch (pageName) {
    case ETHERSCAN_PAGES.TX.name:
    case ETHERSCAN_PAGES.BLOCK.name: {
      const timestampEl = $('#showUtcLocalDate')
      const timestamp = timestampEl.attr('data-timestamp')
      try {
        const localDate = convertUTCDateToLocalDate(
          new Date(Number(timestamp) * 1000)
        )
        timestampEl.text(localDate)
      } catch (e) {
        console.error(e)
      }
      break
    }
    case ETHERSCAN_PAGES.ADDRESS.name: {
      const lnkAgeDateTimeEls = document.querySelectorAll<HTMLElement>(
        '#lnkTxAgeDateTime, #lnkIntAgeDateTime, #lnkMinBlkAgeDateTime'
      )
      replaceAgeElsTipContent()
      replaceDateElsContent()
      const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe')
      replaceInkTxAgeDateTime([...lnkAgeDateTimeEls])
      for (let i = 0; i < iframes.length; ++i) {
        const iframe = iframes[i]
        if (validOrigin(iframe.src)) {
          iframe.addEventListener('load', function () {
            const _document = iframe?.contentWindow?.document
            if (_document) {
              const iframeLnkAgeDateTimeEls =
                _document.querySelectorAll<HTMLElement>(
                  '#lnkErc20AgeDateTime, #lnkErc721AgeDateTime, #lnkErc1155AgeDateTime, #lnkAgeDateTimeV2'
                )
              const ageEls =
                _document.querySelectorAll<HTMLElement>('.showAge > span')
              const dateEls =
                _document.querySelectorAll<HTMLElement>('.showDate > span')

              replaceInkTxAgeDateTime([...iframeLnkAgeDateTimeEls])
              replaceAgeElsTipContent(ageEls)
              replaceDateElsContent(dateEls)
            }
          })
        }
      }
      break
    }
    case ETHERSCAN_PAGES.TOKENTXNS.name:
    case ETHERSCAN_PAGES.TXS.name: {
      const lnkAgeDateTimeEl = document.querySelector<HTMLElement>(
        '.age-datetime-with-tooltip'
      )
      replaceInkTxAgeDateTime(lnkAgeDateTimeEl ? [lnkAgeDateTimeEl] : [])
      replaceAgeElsTipContent()
      replaceDateElsContent()
      break
    }
    case ETHERSCAN_PAGES.BLOCKS.name: {
      const lnkAgeDateTimeEl =
        document.querySelector<HTMLElement>('#lnkAgeDateTimeV2')
      replaceInkTxAgeDateTime(lnkAgeDateTimeEl ? [lnkAgeDateTimeEl] : [])
      replaceAgeElsTipContent()
      replaceDateElsContent()
      break
    }
    case ETHERSCAN_PAGES.BLOCKS_FORKED.name: {
      const lnkAgeDateTimeEl =
        document.querySelector<HTMLElement>('#lnkAgeDateTime')
      replaceInkTxAgeDateTime(lnkAgeDateTimeEl ? [lnkAgeDateTimeEl] : [])
      replaceAgeElsTipContent()
      replaceDateElsContent()
      break
    }
    case ETHERSCAN_PAGES.TOKEN.name: {
      const lnkAgeDateTimeEl = document.querySelector<HTMLElement>(
        '#lnkTokenTxnsAgeDateTime'
      )
      replaceInkTxAgeDateTime(lnkAgeDateTimeEl ? [lnkAgeDateTimeEl] : [])
      replaceAgeElsTipContent()
      replaceDateElsContent()
      break
    }
    case ETHERSCAN_PAGES.TXS_INTERNAL.name: {
      const lnkAgeDateTimeEl =
        document.querySelector<HTMLElement>('#lnkAgeDateTime')
      replaceInkTxAgeDateTime(lnkAgeDateTimeEl ? [lnkAgeDateTimeEl] : [])
      replaceAgeElsTipContent()
      replaceDateElsContent()
      break
    }
    case ETHERSCAN_PAGES.NFT_TRANSFERS.name: {
      // TODO: lost data-bs-title attr
      const lnkAgeDateTimeEl =
        document.querySelector<HTMLElement>('#lnkAgeDateTimeV2')
      const dateEls = document.querySelectorAll<HTMLElement>('.showDate > span')
      const ageEls = document.querySelectorAll<HTMLElement>('.showAge > span')
      replaceInkTxAgeDateTime(lnkAgeDateTimeEl ? [lnkAgeDateTimeEl] : [])
      replaceAgeElsTipContent(ageEls)
      replaceDateElsContent(dateEls)
      break
    }
  }
}

export default convertUTC2locale
