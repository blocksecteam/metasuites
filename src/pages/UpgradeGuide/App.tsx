import React, { type FC } from 'react'
import { Space } from 'antd'

import { Container } from '@common/components'

import styles from './App.module.less'

const App: FC = () => {
  return (
    <div className={styles.container}>
      <header>
        <Container>
          <p>Preview of MetaDock 4.0!</p>
          <p>Will be released in the next few days</p>
        </Container>
      </header>
      <div className={styles.content}>
        <Container>
          <div className={styles.features}>
            <div className={styles.title}>
              <img
                src="https://assets.blocksec.com/image/1695044547407-3.png"
                alt="news"
              />
              New Features & Changes
            </div>
            <div className={styles.desc}>
              Support 6 new chains, including <b>Base, Linea, Polygon zkEVM,</b>
              <br /> and more, along with the related test chains.
            </div>
            <div className={styles.secondaryDesc}>
              (Offering extensive coverage to Etherscan-like blockchain
              explorers)
            </div>
            <img
              className={styles.sketch}
              src="https://assets.blocksec.com/image/1695100108514-2.png"
              alt=""
            />
            <div className={styles.permissions}>
              The mechanism to restrict the running sites of MetaDock: Chrome
              permission system -&gt; the internal permission configuration of
              the extension
            </div>
            <img
              className={styles.sketch}
              src="https://assets.blocksec.com/image/1695045144330-2.png"
              alt=""
            />
          </div>
          <div className={styles.importantReminder}>
            <div className={styles.title}>
              <img
                src="https://assets.blocksec.com/image/1695044547407-2.png"
                alt="news"
              />
              Important Reminder
            </div>
            <div className={styles.desc}>
              To better serve users, we changed the mechanisms to restrict the
              running sites of our extension from the Chrome permission system
              to our internal permission configuration. You will encounter a
              pop-up like the one below, please click &quot;Accept
              permissions&quot; to complete the upgrade. The running sites of
              MetaDock are still restricted and can be fully controlled by
              users.
            </div>
            <p>
              MetaDock&apos;s code is open-sourced on{' '}
              <a
                href="https://github.com/blocksecteam/metadock"
                target="_blank"
              >
                Github
              </a>
              .
            </p>
            <img
              className={styles.acceptPermissionsImg}
              src="https://assets.blocksec.com/image/1695045808123-2.png"
              alt=""
            />
          </div>
        </Container>
      </div>
      <footer>
        <Container className="justify-between">
          <div className={styles.copyright}>
            <a href="https://blocksec.com/metadock" target="_blank">
              <img
                className={styles.logo}
                src="https://assets.blocksec.com/image/1695043448890-2.png"
                alt="logo"
              />
            </a>
            2023 ©BlockSec
          </div>
          <div className={styles.shortcuts}>
            <a
              href="mailto:metadockteam@blocksec.com"
              target="_blank"
              className={styles.email}
            >
              metadockteam@blocksec.com
            </a>
            <Space size={10}>
              <a href="https://twitter.com/MetaDockTeam" target="_blank">
                <i className="iconfont icon-twitter" />
              </a>
              <a
                href="https://github.com/blocksecteam/metadock"
                target="_blank"
              >
                <i className="iconfont icon-github" />
              </a>
            </Space>
          </div>
        </Container>
      </footer>
    </div>
  )
}

export default App
