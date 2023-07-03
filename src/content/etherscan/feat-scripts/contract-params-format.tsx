import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import { getAddress, isAddress } from 'ethers'

import { FormatParamBtn } from '../components'

const formatTuple = (params: string): string => {
  const toArray = (str: string): string => {
    const arr = str.split(';').map(subStr =>
      subStr.split(',').map(i => {
        const v = i.trim()
        if (v === 'true') {
          return true
        }
        if (v === 'false') {
          return false
        }
        return isAddress(v) ? getAddress(v) : v
      })
    )
    const arrFlat = arr.length === 1 ? arr.flat(1) : arr
    return JSON.stringify(arrFlat)
  }
  try {
    if (params.indexOf(',') === -1 && params.indexOf(';') === -1) {
      if (params.indexOf(' ') === -1) {
        return params
      } else {
        return JSON.stringify(params.split(' '))
      }
    }
    if (Array.isArray(JSON.parse(params))) {
      return params
    }
    return toArray(params)
  } catch (e) {
    if (params[0] === '[' && params[params.length - 1] === ']') {
      return params.replace(/(\w+)/g, '"$1"').replace(/undefined/g, 'null')
    }
    return toArray(params)
  }
}

/** Quick format parameters */
const formatWriteContractParams = async () => {
  const writeContractIframes = $(
    '#writecontractiframe, #writeproxycontractiframe'
  )
  writeContractIframes.each(function () {
    const renderButtons = () => {
      $(this)
        .contents()
        .find('.collapse .card-body form .form-group input')
        .each(function () {
          const input = $(this)
          input.siblings('br').remove()
          const rootEl = document.createElement('span')
          input.before(rootEl)
          const type = $(this).attr('data-bs-type')
          createRoot(rootEl).render(
            <FormatParamBtn
              onClick={() => {
                const val = input.val()
                if (typeof val !== 'string') return
                if (type === 'address') {
                  if (isAddress(val)) {
                    input.val(getAddress(val))
                  }
                } else {
                  input.val(formatTuple(val))
                }
              }}
            />
          )
        })
    }

    const iframeContentsExist = !!$(this).contents().find('#header').children()
      .length

    if (iframeContentsExist) {
      renderButtons()
      return
    }

    $(this).on('load', async () => {
      renderButtons()
    })
  })
}

export default formatWriteContractParams
