import React, { type FC } from 'react'
import { Space, Checkbox, Switch } from 'antd'

import type { OptKeys } from '@src/store'
import { Cell, Drawer } from '@common/components'
import { useStore } from '@common/hooks'
import { TransactionParsers } from '@common/constants'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
  onSwitchChange: (key: OptKeys, value: boolean, refresh?: boolean) => void
  onAlternativeParsersChange: (parser: string, enabled: boolean) => void
}

const ConfigExploresDrawer: FC<Props> = ({
  visible,
  onClose,
  onSwitchChange,
  onAlternativeParsersChange
}) => {
  const [options] = useStore('options')
  const [alternativeParsers] = useStore('alternativeParsers')

  return (
    <Drawer visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Cell.Group>
            <Cell
              title="Show transaction summary"
              action={
                <Switch
                  size="small"
                  checked={options.txSummary}
                  onChange={val => onSwitchChange('txSummary', val)}
                />
              }
            />
            <Cell
              title="Show the fund flow chart"
              action={
                <Switch
                  size="small"
                  checked={options.fundFlow}
                  onChange={val => onSwitchChange('fundFlow', val)}
                />
              }
            />
            <Cell
              title="Show enhanced function signatures"
              action={
                <Switch
                  size="small"
                  checked={options.enhancedSignatures}
                  onChange={val => onSwitchChange('enhancedSignatures', val)}
                />
              }
            />
            <Cell
              title="Show compliance scores for addresses"
              action={
                <Switch
                  size="small"
                  checked={options.complianceScores}
                  onChange={val => onSwitchChange('complianceScores', val)}
                />
              }
            />
            <Cell
              title="Show enhanced address labels"
              action={
                <Switch
                  size="small"
                  checked={options.enhancedLabels}
                  onChange={val => onSwitchChange('enhancedLabels', val)}
                />
              }
            />
            <Cell
              title="Convert UTC to Local Time Zone"
              action={
                <Switch
                  size="small"
                  checked={options.utc2locale}
                  onChange={val => onSwitchChange('utc2locale', val)}
                />
              }
            />
            <Cell
              title="Show enhanced copy icon"
              action={
                <Switch
                  size="small"
                  checked={options.showCopyIcon}
                  onChange={val => onSwitchChange('showCopyIcon', val)}
                />
              }
            />
            <Cell
              title="Show the source of funding for contract deployers"
              action={
                <Switch
                  size="small"
                  checked={options.addressFunderLabel}
                  onChange={val => onSwitchChange('addressFunderLabel', val)}
                />
              }
            />
            <Cell
              title="Enable batch download of contract source code and ABI"
              action={
                <Switch
                  size="small"
                  checked={options.contractSourcecode}
                  onChange={val => onSwitchChange('contractSourcecode', val)}
                />
              }
            />
            <Cell
              border={false}
              title="Show other enhanced parsers for transactions"
              action={
                <Switch
                  size="small"
                  checked={options.quick2Parsers}
                  onChange={val => onSwitchChange('quick2Parsers', val)}
                />
              }
            />
            <Cell
              style={{ paddingTop: 0 }}
              action={null}
              title={
                <div className="justify-between md-flex">
                  <Space>
                    <span style={{ fontSize: 'inherit' }}>Openchain</span>
                    <Checkbox
                      checked={
                        alternativeParsers[TransactionParsers.OPENCHAIN.value()]
                      }
                      onChange={e =>
                        onAlternativeParsersChange(
                          TransactionParsers.OPENCHAIN.value(),
                          e.target.checked
                        )
                      }
                    />
                  </Space>
                  <Space>
                    <span style={{ fontSize: 'inherit' }}>Tenderly</span>
                    <Checkbox
                      checked={
                        alternativeParsers[TransactionParsers.TENDERLY.value()]
                      }
                      onChange={e =>
                        onAlternativeParsersChange(
                          TransactionParsers.TENDERLY.value(),
                          e.target.checked
                        )
                      }
                    />
                  </Space>
                  <Space>
                    <span style={{ fontSize: 'inherit' }}>Dedaub</span>
                    <Checkbox
                      checked={
                        alternativeParsers[TransactionParsers.DEDAUB.value()]
                      }
                      onChange={e =>
                        onAlternativeParsersChange(
                          TransactionParsers.DEDAUB.value(),
                          e.target.checked
                        )
                      }
                    />
                  </Space>
                </div>
              }
            />
            <Cell
              title="Show quick open in DeBank for addresses"
              action={
                <Switch
                  size="small"
                  checked={options.quick2debank}
                  onChange={val => onSwitchChange('quick2debank', val)}
                />
              }
            />
            <Cell
              title="Show quick open in Dedaub for unverified contracts"
              action={
                <Switch
                  size="small"
                  checked={options.decompileInDedaub}
                  onChange={val => onSwitchChange('decompileInDedaub', val)}
                />
              }
            />
            <Cell
              title="Show quick open in ethervm.io for unverified contracts"
              action={
                <Switch
                  size="small"
                  checked={options.decompileInEthervm}
                  onChange={val => onSwitchChange('decompileInEthervm', val)}
                />
              }
            />
            <Cell
              title="Show quick open in DethCode for verified contracts"
              action={
                <Switch
                  size="small"
                  checked={options.dethCode}
                  onChange={val => onSwitchChange('dethCode', val)}
                />
              }
            />
            <Cell
              title="Show export data for a part of transactions"
              action={
                <Switch
                  size="small"
                  checked={options.exportTableData}
                  onChange={val => onSwitchChange('exportTableData', val)}
                />
              }
            />
            <Cell
              title="Show alternative block explorers"
              action={
                <Switch
                  size="small"
                  checked={options.alternativeBlockExplorers}
                  onChange={val =>
                    onSwitchChange('alternativeBlockExplorers', val)
                  }
                />
              }
            />
            <Cell
              title="Show approval diagnosis"
              action={
                <Switch
                  size="small"
                  checked={options.approvalDiagnosis}
                  onChange={val => onSwitchChange('approvalDiagnosis', val)}
                />
              }
            />
            <Cell
              title="Show private variables"
              action={
                <Switch
                  size="small"
                  checked={options.privateVariables}
                  onChange={val => onSwitchChange('privateVariables', val)}
                />
              }
            />
            <Cell
              title="Quick format parameters"
              action={
                <Switch
                  size="small"
                  checked={options.formatContractParams}
                  onChange={val => onSwitchChange('formatContractParams', val)}
                />
              }
            />
            <Cell
              title="Show nft marketplaces"
              action={
                <Switch
                  size="small"
                  checked={options.tokenMarketplaces}
                  onChange={val => onSwitchChange('tokenMarketplaces', val)}
                />
              }
            />
            {/**/}
            <Cell
              title="Show proxy upgrade log"
              action={
                <Switch
                  size="small"
                  checked={options.proxyLogs}
                  onChange={val => onSwitchChange('proxyLogs', val)}
                />
              }
            />
            <Cell
              title="Show Dedaub storage shortcut"
              action={
                <Switch
                  size="small"
                  checked={options.dedaubStorage}
                  onChange={val => onSwitchChange('dedaubStorage', val)}
                />
              }
            />
            <Cell
              title="Show transaction simulator"
              action={
                <Switch
                  size="small"
                  checked={options.txSimulator}
                  onChange={val => onSwitchChange('txSimulator', val)}
                />
              }
            />
            <Cell
              title="Show Variable Logs"
              action={
                <Switch
                  size="small"
                  checked={options.variableLogs}
                  onChange={val => onSwitchChange('variableLogs', val)}
                />
              }
            />
            <Cell
              title="Show private local labels"
              action={
                <Switch
                  size="small"
                  checked={options.enablePrivateLabels}
                  onChange={val => onSwitchChange('enablePrivateLabels', val)}
                />
              }
            />
            <Cell
              title="Sync local labels with Phalcon Explorer"
              action={
                <Switch
                  size="small"
                  checked={options.syncPhalconLabels}
                  onChange={val => onSwitchChange('syncPhalconLabels', val)}
                />
              }
            />
            <Cell
              border={false}
              title="Hide zero-amount token transfers"
              action={
                <Switch
                  size="small"
                  checked={options.hideZeroValueTransfers}
                  onChange={val =>
                    onSwitchChange('hideZeroValueTransfers', val)
                  }
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
