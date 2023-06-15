import ky from 'ky'

import { BASE_URL } from '@common/config/uri'
import { isNil } from '@common/utils'

import { version } from '../../../package.json'

export interface BscResponse<T> {
  success: boolean
  message: string
  data: T
}

const request = ky.create({
  prefixUrl: BASE_URL,
  retry: 2,
  timeout: 100000,
  headers: {
    'content-type': 'application/json',
    'blocksec-meta-dock': `v${version}`
  },
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        try {
          const res = await response.json()
          const bscResponse = {
            success: isNil(res.code),
            data: res,
            message: res.message ?? 'success'
          }
          return new Response(JSON.stringify(bscResponse))
        } catch (e) {
          return new Response(
            JSON.stringify({
              success: false,
              message:
                'The service is currently unavailable, please try again later.'
            })
          )
        }
      }
    ]
  }
})

export default request
