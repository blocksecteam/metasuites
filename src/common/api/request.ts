import ky from 'ky'

import { BASE_URL } from '@common/config/uri'

import { version } from '../../../package.json'

export interface BscResponse<T> {
  code?: number
  message?: string
  data: T
}

const request = ky.create({
  prefixUrl: BASE_URL,
  retry: 2,
  timeout: 100000,
  headers: {
    'content-type': 'application/json',
    'blocksec-meta-dock': `v${version}`
  }
})

export default request
