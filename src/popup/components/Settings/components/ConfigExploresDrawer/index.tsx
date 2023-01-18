import React, { type FC } from 'react'

import type { OptKeys } from '@src/store'
import { Cell, Drawer, Switch } from '@common/components'
import { useStore } from '@common/hooks'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
  onChange: (key: OptKeys, value: unknown, refresh?: boolean) => void
}

const ConfigExploresDrawer: FC<Props> = ({ visible, onClose, onChange }) => {
  const [options] = useStore('options')

  return (
    <Drawer visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Cell.Group>
            <Cell
              title="Show the fund flow chart"
              action={
                <Switch
                  checked={options.fundFlow as boolean}
                  onChange={val => onChange('fundFlow', val)}
                />
              }
            />
            <Cell
              title="Show enhanced function signatures"
              action={
                <Switch
                  checked={options.enhancedSignatures as boolean}
                  onChange={val => onChange('enhancedSignatures', val)}
                />
              }
            />
            <Cell
              title="Show compliance scores for addresses"
              action={
                <Switch
                  checked={options.complianceScores as boolean}
                  onChange={val => onChange('complianceScores', val)}
                />
              }
            />
            <Cell
              title="Show enhanced address labels"
              action={
                <Switch
                  checked={options.enhancedLabels as boolean}
                  onChange={val => onChange('enhancedLabels', val)}
                />
              }
            />
            <Cell
              title="Convert UTC to Local Time Zone"
              action={
                <Switch
                  checked={options.utc2locale as boolean}
                  onChange={val => onChange('utc2locale', val)}
                />
              }
            />
            <Cell
              title="Show copy icon for addresses"
              action={
                <Switch
                  checked={options.copyAddress as boolean}
                  onChange={val => onChange('copyAddress', val)}
                />
              }
            />
            <Cell
              title="Show NFT floor price in major markets"
              action={
                <Switch
                  checked={options.nftFloorPrice as boolean}
                  onChange={val => onChange('nftFloorPrice', val)}
                />
              }
            />
            <Cell
              title="Show the source of funding for contract deployers"
              action={
                <Switch
                  checked={options.addressFunderLabel as boolean}
                  onChange={val => onChange('addressFunderLabel', val)}
                />
              }
            />
            <Cell
              title="Enable batch download of contract source code and ABI"
              action={
                <Switch
                  checked={options.contractSourcecode as boolean}
                  onChange={val => onChange('contractSourcecode', val)}
                />
              }
            />
            <Cell
              title="Show quick open in multiple enhanced parsers for transactions"
              action={
                <Switch
                  checked={options.quick2Parsers as boolean}
                  onChange={val => onChange('quick2Parsers', val)}
                />
              }
            />
            <Cell
              title="Show quick open in DeBank for addresses"
              action={
                <Switch
                  checked={options.quick2debank as boolean}
                  onChange={val => onChange('quick2debank', val)}
                />
              }
            />
            <Cell
              title="Show quick open in Dedaub for unverified contracts"
              action={
                <Switch
                  checked={options.decompileInDedaub as boolean}
                  onChange={val => onChange('decompileInDedaub', val)}
                />
              }
            />
            <Cell
              border={false}
              title="Show quick open in ethervm.io for unverified contracts"
              action={
                <Switch
                  checked={options.decompileInEthervm as boolean}
                  onChange={val => onChange('decompileInEthervm', val)}
                />
              }
            />
            <Cell
              title="Show quick open in DethCode for verified contracts"
              action={
                <Switch
                  checked={options.dethCode as boolean}
                  onChange={val => onChange('dethCode', val)}
                />
              }
            />
            <Cell
              title="Show quick open in NFTGo for NFT contracts"
              action={
                <Switch
                  checked={options.quick2NFTGo as boolean}
                  onChange={val => onChange('quick2NFTGo', val)}
                />
              }
            />
            <Cell
              title="Show export data for a part of transactions"
              action={
                <Switch
                  checked={options.exportTableData as boolean}
                  onChange={val => onChange('exportTableData', val)}
                />
              }
            />
            <Cell
              border={false}
              title="Show alternative block explorers"
              action={
                <Switch
                  checked={options.alternativeBlockExplorers as boolean}
                  onChange={val => onChange('alternativeBlockExplorers', val)}
                />
              }
            />
          </Cell.Group>
        </div>
      </div>
    </Drawer>
  )
}

export default ConfigExploresDrawer
