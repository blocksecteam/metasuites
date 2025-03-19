import { useMemo } from 'react'

import type { PrivateLabel } from '@src/store'
import { formatAddress } from '@common/utils/biz'
import { DEFAULT_LABEL_COLOR } from '@common/components/ModalAddPrivateLabel'
import { PrivateLabelSource } from '@common/constants'

import useStore from './useStore'

type PrivateLabelResult = {
  privateLabel: PrivateLabel | undefined
  color: string
}

type UsePrivateLabelsReturn = {
  privateLabels: Record<string, PrivateLabel>
  setPrivateLabels: (newLabels: Record<string, PrivateLabel>) => void
  deletePrivateLabel: (chainType: string, address: string) => boolean
  addPrivateLabel: (
    chainType: string,
    address: string,
    labelData: Omit<PrivateLabel, 'address'>
  ) => string
  getPrivateLabel: (
    chainType: string,
    address: string,
    defaultColor?: string
  ) => PrivateLabelResult
}

const usePrivateLabels = (includeDeleted = false): UsePrivateLabelsReturn => {
  const [privateLabels, setPrivateLabelsRaw] = useStore('privateLabels')
  const [options] = useStore('options')
  const syncPhalconLabels = options?.syncPhalconLabels !== false

  const normalizeKey = (chainType: string, address: string): string => {
    const formattedAddress = formatAddress(address)
    return `${chainType}-${formattedAddress}`
  }

  const setPrivateLabels = (newLabels: Record<string, PrivateLabel>) => {
    const normalizedLabels: Record<string, PrivateLabel> = {}

    Object.entries(newLabels).forEach(([key, value]) => {
      const [chainType, address] = key.split('-')
      if (!chainType || !address) {
        normalizedLabels[key] = value
        return
      }

      const normalizedKey = normalizeKey(chainType, address)

      if (
        normalizedLabels[normalizedKey] &&
        normalizedLabels[normalizedKey].deleted &&
        !value.deleted
      ) {
        normalizedLabels[normalizedKey] = value
      } else if (!normalizedLabels[normalizedKey]) {
        normalizedLabels[normalizedKey] = {
          ...value,
          address: formatAddress(value.address)
        }
      }
    })

    setPrivateLabelsRaw(normalizedLabels)
  }

  const processLabels = (labels: Record<string, PrivateLabel>) => {
    return Object.entries(labels).reduce(
      (acc, [key, value]: [string, PrivateLabel]) => {
        const processedValue = { ...value }

        if (processedValue.address) {
          processedValue.address = formatAddress(processedValue.address)
        }

        acc[key] = processedValue
        return acc
      },
      {} as Record<string, PrivateLabel>
    )
  }

  const addPrivateLabel = (
    chainType: string,
    address: string,
    labelData: Omit<PrivateLabel, 'address'>
  ) => {
    const normalizedKey = normalizeKey(chainType, address)
    const formattedAddress = formatAddress(address)
    const newPrivateLabels = { ...privateLabels }

    newPrivateLabels[normalizedKey] = {
      ...labelData,
      address: formattedAddress,
      deleted: false
    }

    setPrivateLabels(newPrivateLabels)
    return normalizedKey
  }

  const getPrivateLabel = (
    chainType: string,
    address: string,
    defaultColor?: string
  ): PrivateLabelResult => {
    const normalizedKey = normalizeKey(chainType, address)
    const privateLabel = processedLabels[normalizedKey]
    return {
      privateLabel,
      color: privateLabel?.color || defaultColor || DEFAULT_LABEL_COLOR
    }
  }

  const deletePrivateLabel = (chainType: string, address: string) => {
    const normalizedKey = normalizeKey(chainType, address)
    const newPrivateLabels = { ...privateLabels }
    let found = false

    if (newPrivateLabels[normalizedKey]) {
      newPrivateLabels[normalizedKey] = {
        ...newPrivateLabels[normalizedKey],
        deleted: true
      }
      found = true
    } else {
      const unformattedKey = `${chainType}-${address}`
      if (
        normalizedKey !== unformattedKey &&
        newPrivateLabels[unformattedKey]
      ) {
        newPrivateLabels[unformattedKey] = {
          ...newPrivateLabels[unformattedKey],
          deleted: true
        }
        found = true
      }
    }

    if (found) {
      setPrivateLabels(newPrivateLabels)
      return true
    }

    return false
  }

  const filteredLabels = useMemo(() => {
    return Object.entries(privateLabels).reduce(
      (acc, [key, value]: [string, PrivateLabel]) => {
        if (!includeDeleted && value.deleted) {
          return acc
        }

        if (!syncPhalconLabels && value.source === PrivateLabelSource.PE) {
          return acc
        }

        acc[key] = value
        return acc
      },
      {} as Record<string, PrivateLabel>
    )
  }, [privateLabels, includeDeleted, syncPhalconLabels])

  const processedLabels = useMemo(() => {
    return processLabels(filteredLabels)
  }, [filteredLabels])

  return {
    privateLabels: processedLabels,
    setPrivateLabels,
    deletePrivateLabel,
    addPrivateLabel,
    getPrivateLabel
  }
}

export default usePrivateLabels
