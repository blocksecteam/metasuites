import React, { type FC } from 'react'

import type { OptKeys } from '@src/store'
import { Cell, Drawer, Switch } from '@common/components'
import { useStore } from '@common/hooks'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
  onChange: (
    key: Exclude<OptKeys, 'supportWebList'>,
    value: boolean,
    refresh?: boolean
  ) => void
}

const ConfigExploresDrawer: FC<Props> = ({ visible, onClose, onChange }) => {
  const [options] = useStore('options')

  return (
    <Drawer visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Cell.Group>
            <Cell
              title="Show transaction summary"
              action={
                <Switch
                  checked={options.txSummary}
                  onChange={val => onChange('txSummary', val)}
                />
              }
            />
            <Cell
              title="Show the fund flow chart"
              action={
                <Switch
                  checked={options.fundFlow}
                  onChange={val => onChange('fundFlow', val)}
                />
              }
            />
            <Cell
              title="Show enhanced function signatures"
              action={
                <Switch
                  checked={options.enhancedSignatures}
                  onChange={val => onChange('enhancedSignatures', val)}
                />
              }
            />
            <Cell
              title="Show compliance scores for addresses"
              action={
                <Switch
                  checked={options.complianceScores}
                  onChange={val => onChange('complianceScores', val)}
                />
              }
            />
            <Cell
              title="Show enhanced address labels"
              action={
                <Switch
                  checked={options.enhancedLabels}
                  onChange={val => onChange('enhancedLabels', val)}
                />
              }
            />
            <Cell
              title="Convert UTC to Local Time Zone"
              action={
                <Switch
                  checked={options.utc2locale}
                  onChange={val => onChange('utc2locale', val)}
                />
              }
            />
            <Cell
              title="Show enhanced copy icon"
              action={
                <Switch
                  checked={options.showCopyIcon}
                  onChange={val => onChange('showCopyIcon', val)}
                />
              }
            />
            <Cell
              title="Show NFT floor price in major markets"
              action={
                <Switch
                  checked={options.nftFloorPrice}
                  onChange={val => onChange('nftFloorPrice', val)}
                />
              }
            />
            <Cell
              title="Show the source of funding for contract deployers"
              action={
                <Switch
                  checked={options.addressFunderLabel}
                  onChange={val => onChange('addressFunderLabel', val)}
                />
              }
            />
            <Cell
              title="Enable batch download of contract source code and ABI"
              action={
                <Switch
                  checked={options.contractSourcecode}
                  onChange={val => onChange('contractSourcecode', val)}
                />
              }
            />
            <Cell
              title="Show quick open in multiple enhanced parsers for transactions"
              action={
                <Switch
                  checked={options.quick2Parsers}
                  onChange={val => onChange('quick2Parsers', val)}
                />
              }
            />
            <Cell
              title="Show quick open in DeBank for addresses"
              action={
                <Switch
                  checked={options.quick2debank}
                  onChange={val => onChange('quick2debank', val)}
                />
              }
            />
            <Cell
              title="Show quick open in Dedaub for unverified contracts"
              action={
                <Switch
                  checked={options.decompileInDedaub}
                  onChange={val => onChange('decompileInDedaub', val)}
                />
              }
            />
            <Cell
              border={false}
              title="Show quick open in ethervm.io for unverified contracts"
              action={
                <Switch
                  checked={options.decompileInEthervm}
                  onChange={val => onChange('decompileInEthervm', val)}
                />
              }
            />
            <Cell
              title="Show quick open in DethCode for verified contracts"
              action={
                <Switch
                  checked={options.dethCode}
                  onChange={val => onChange('dethCode', val)}
                />
              }
            />
            <Cell
              title="Show quick open in NFTGo for NFT contracts"
              action={
                <Switch
                  checked={options.quick2NFTGo}
                  onChange={val => onChange('quick2NFTGo', val)}
                />
              }
            />
            <Cell
              title="Show export data for a part of transactions"
              action={
                <Switch
                  checked={options.exportTableData}
                  onChange={val => onChange('exportTableData', val)}
                />
              }
            />
            <Cell
              title="Show alternative block explorers"
              action={
                <Switch
                  checked={options.alternativeBlockExplorers}
                  onChange={val => onChange('alternativeBlockExplorers', val)}
                />
              }
            />
            <Cell
              title="Show approval diagnosis"
              action={
                <Switch
                  checked={options.approvalDiagnosis}
                  onChange={val => onChange('approvalDiagnosis', val)}
                />
              }
            />
            <Cell
              title="Show enhanced address labels by Forta"
              action={
                <Switch
                  checked={options.enhancedFortaLabels}
                  onChange={val => onChange('enhancedFortaLabels', val)}
                />
              }
            />
            <Cell
              title="Alert suspicious transactions by Forta"
              action={
                <Switch
                  checked={options.txnFortaAlert}
                  onChange={val => onChange('txnFortaAlert', val)}
                />
              }
            />
            <Cell
              title="Show private variables"
              action={
                <Switch
                  checked={options.privateVariables}
                  onChange={val => onChange('privateVariables', val)}
                />
              }
            />
            <Cell
              title="Quick format parameters"
              action={
                <Switch
                  checked={options.formatContractParams}
                  onChange={val => onChange('formatContractParams', val)}
                />
              }
            />
            <Cell
              title="Show nft marketplaces"
              action={
                <Switch
                  checked={options.tokenMarketplaces}
                  onChange={val => onChange('tokenMarketplaces', val)}
                />
              }
            />
            {/**/}
            <Cell
              title="Show proxy upgrade log"
              action={
                <Switch
                  checked={options.proxyLogs}
                  onChange={val => onChange('proxyLogs', val)}
                />
              }
            />
            <Cell
              title="Show evm.storage shortcut"
              action={
                <Switch
                  checked={options.evmStorage}
                  onChange={val => onChange('evmStorage', val)}
                />
              }
            />
            <Cell
              title="Show transaction simulator"
              action={
                <Switch
                  checked={options.txSimulator}
                  onChange={val => onChange('txSimulator', val)}
                />
              }
            />
            <Cell
              border={false}
              title="Show Variable Logs"
              action={
                <Switch
                  checked={options.variableLogs}
                  onChange={val => onChange('variableLogs', val)}
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
