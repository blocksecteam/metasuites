import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { convertUTCDateToLocalDate, validOrigin } from '@common/utils'
import { ETHERSCAN_PAGES, DATE_STANDARD_FORMAT_REG } from '@common/constants'

dayjs.extend(utc)

/** Parse the time formatted by scan as local time, keeping the original format
 * e.g. 6 hrs 48 mins ago (Nov-22-2022 04:48:11 AM +UTC) => 7 hours ago (2022-11-22 12:48:11 local time) */
const convertFormativeUTCTimeToLocale = (date: string) => {
  const reg = /\(([^)]*)\)/
  const dateUTC = date.match(reg)?.[1]?.replace('+UTC', 'UTC')?.trim()
  if (!dateUTC) return date
  try {
    const dt = new Date(dateUTC).toLocaleString()
    const ago = date.slice(0, date.indexOf('('))
    return `${ago} (${dayjs(dt).format('YYYY-MM-DD HH:mm:ss')} local time)`
  } catch (e) {
    return date
  }
}

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
    document.querySelectorAll<HTMLElement>(
      '.showAge > span[data-original-title]'
    )
  for (let i = 0; i < _ageEls.length; i++) {
    const el = _ageEls[i]
    const dateUTC = el.getAttribute('data-original-title')

    if (dateUTC && DATE_STANDARD_FORMAT_REG.test(dateUTC)) {
      const localDate = dayjs.utc(dateUTC).local().format('YYYY-MM-DD HH:mm:ss')
      el.setAttribute('data-original-title', localDate)
    }
  }
}

/** Replace the content in date mode */
const replaceDateElsContent = (dateEls?: NodeListOf<HTMLElement>) => {
  const _dateEls =
    dateEls ??
    document.querySelectorAll<HTMLElement>(
      '.showDate > span[data-original-title]'
    )
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
      const isTxPage = pageName === ETHERSCAN_PAGES.TX.name
      let timestampEl: HTMLElement | null | undefined
      if (isTxPage) {
        timestampEl =
          document.querySelector<HTMLElement>('#clock')?.parentElement
      } else {
        timestampEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_maintable > div .fa-clock'
        )?.parentElement
      }
      if (!timestampEl) return
      const childIdx = isTxPage ? 3 : 2
      const date = convertFormativeUTCTimeToLocale(timestampEl.innerText)
      if (timestampEl?.childNodes?.[childIdx]?.textContent) {
        timestampEl.childNodes[childIdx].textContent = date
      }
      break
    }
    case ETHERSCAN_PAGES.ADDRESS.name: {
      const lnkAgeDateTimeEls = document.querySelectorAll<HTMLElement>(
        '#lnkTxAgeDateTime, #lnkIntAgeDateTime, #lnkMinBlkAgeDateTime'
      )
      replaceAgeElsTipContent()
      replaceDateElsContent()
      const iframes = document.querySelectorAll('iframe')
      replaceInkTxAgeDateTime([...lnkAgeDateTimeEls])
      for (let i = 0; i < iframes.length; ++i) {
        const iframe = iframes[i]
        if (validOrigin(iframe.src)) {
          iframe.addEventListener('load', function () {
            const _document = iframe?.contentWindow?.document
            if (_document) {
              const iframeLnkAgeDateTimeEls =
                _document.querySelectorAll<HTMLElement>(
                  '#lnkErc20AgeDateTime, #lnkErc721AgeDateTime, #lnkErc1155AgeDateTime'
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
    case ETHERSCAN_PAGES.BLOCKS_FORKED.name:
    case ETHERSCAN_PAGES.TOKENTXNS.name:
    case ETHERSCAN_PAGES.TXS.name:
    case ETHERSCAN_PAGES.BLOCKS.name: {
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
  }
}

export default convertUTC2locale
