### v5.8.5

- [feat] Adapt to Sonic Explorer

### v5.8.4

- [fix] Add text sanitization to prevent XSS attacks in address labels

### v5.8.3

- [fix] Fix local label deletion functionality

### v5.8.2

- [fix] Fix Tronscan compatibility

### v5.8.1

- [perf] Optimize local label button rendering logic with asynchronous address labels
- [feat] Fix contract Public variables display & replace jQuery html() DOM rendering method

### v5.8.0

- [feat] Adapt to explorer.cloverpool.com website
- [feat] Hide zero-value transfers in token transfer tab

### v5.7.1

- [update] Remove non-functional features
- [perf] Optimize label synchronization functionality

### v5.7.0

- [feat] Sync local labels with Phalcon Explorer

### v5.6.3

- [fix] Fixed known issues

### v5.6.2

- [fix] Fixed known issues

### v5.6.1

- [fix] Fixed known issues

### v5.6.0

- [feat] OKX supports tx and developer tools

### v5.5.1

- [fix] Fixed known issues

### v5.5.0

- [feat] Adapt to OKX Explorer
- [feat] Support Decompile in Dedaub on BSC

### v5.4.3

- [fix] Workaround for the issue with chrome.runtime.getURL introduced in Chrome 130 causing CSP rejecting script due to different origin (GUID instead of chrome extension id)
- [feat] Fundflow supports partner-specific request parameters
- [chore] Replace the ETH logo

### v5.4.1

- [fix] Corrected the issue with the Solscan link redirecting to the wrong Phalcon Explorer URL
- [style] Updated the styling of the Solscan Fund Flow button

### v5.4.0

- [feat] Adapt to MantleScan

### v5.3.0

- [test] Add new test cases to ensure the functionality of the code is thoroughly tested
- [feat] Link Solana Fundflow to the current blockchain explorer
- [feat] Enhance domain name whitelist matching to support parameter-level and multi-level subdomain URL matching rules
- [chore] Optimize content script code
- [update] Phalcon Explorer Polygon will no longer support simulate functionality
- [fix] Fix the issue of Phalcon Explorer button not working on Jito Explorer

### v5.2.2

-[fix] Fix the issue of exporting CSV files causing character encoding problems

### v5.2.1

- [fix] Fix the issue with Phalcon Explorer button on Solscan Transaction Details page

### v5.2.0

- [feat] Add a Phalcon Explorer entry on the explorer.jito.wtf bundle page
- [feat] Adapt to the new versions of Gnosisscan, Cronoscan, and Arbiscan

### v5.1.2

- [fix] Fix the issue where the solscan tx page does not correctly display the Phalcon Explorer button

### v5.1.1

- [style] Update the styles for the Phalcon shortcut link

### v5.1.0

- [feat] Add shortcut to navigate Solana transaction hashes to Phalcon Explorer
- [fix] Fix extension functionality issue caused by solana.fm website update

### v5.0.7

- [feat] Adapted to the new version of basescan
- [fix] Remove the copy button for the new version of Etherscan transaction hash, and readapt some of the copy block buttons

### v5.0.6

- [fix] Replace copy-to-clipboard with clipboard-copy package
- [chore] Update node version requirement in CONTRIBUTING.md

### v5.0.5

- [fix] Fix the bug in the Fund Flow feature on the Solscan website that causes the current Solana address to be retrieved incorrectly

### v5.0.4

- [feat] Enhance the address label functionality on the Solscan token page

### v5.0.3

- [fix] Restore the copy functionality for transaction hashes

### v5.0.2

- [fix] Fixed the bug where the to address on the transaction page might be incorrectly replaced
- [fix] Fixed the bug where the current address is not being replaced in the BTC explorer
- [fix] Fixed the bug where the CPU and memory usage increases in slow network conditions

### v5.0.1

- [perf] Search for private tags ignores case sensitivity
- [fix] Fix the bug where saving local labels on the Arkham website fails
- [dix] Fix the bug where importing local labels fails

### v5.0.0

- [feat] Supports Solana scans
- [feat] Added local label functionality
- [feat] Supports Arkham local label functionality and Phalcon quick link, Debank local label functionality
- [feat] Supports Merlin Scan
- [feat] BTC Explorer supports local label functionality
- [feat] Etherscan supports quick opening of transaction lists in the Phalcon explorer

### v4.8.0

- [fix] Fix bug causing style conflicts

### v4.8.0

- [update] Update the domain for Phalcon Explorer
- [feat] Added support for zkSync on Blockscout
- [feat] Adapted to snowscan.xyz as a replacement for the previous snowtrace.io
- [fix] Fixed various bugs

### v4.7.0

- [feat] Integration with Blockscout explorer
- [update] Update dedaub decompile functionality
- [fix] Fix the styling issue of the "Download Contract Source Code" button on zkevm.polygonscan.com

### v4.6.0

- [feat] Added support for basescan in deth
- [chore] Changed the name of the extension from "MetaDock" to "MetaSuites"

### v4.5.2

- [fix] Resolve the issue of incorrect redirection of Phalcon links

### v4.5.1

- [feat] Add support for ZkSync chain in Debank shortcut
- [fix] Resolve bug in Lineascan transaction link redirection to Phalcon with incorrect path

### v4.5.0

- [feat] Adapt for zkSync Era network

### v4.4.0

- [feat] Adapt to the new template of Moonscan

### v4.3.0

- [feat] Integrated selected functionalities with Snowtrace.io
- [update] Set transaction explanation feature to be off by default
- [feat] Enabled support for decompilation via bytecode MD5 in Dedaub

### v4.2.0

- [feat] Adaptation to Tronscan implemented
- [perf] UI interactions beautified and improved
- [fix] Various bugs fixed

### v4.1.1

- [feat] Adapt Mumbai and Fantom's new look
- [feat] Add label to contract creator address
- [fix] Fix UTC time format bug in variable history

### v4.1.0

- [feat] Adapt to the new template of Polygonscan
- [fix] Resolve NFT risk radar chart malfunction due to opensea website updates
- [fix] Correct invalid redirect links in the downloaded fundflow SVG images

### v4.0.1

- [fix] Resolve domain matching issues
- [fix] Fix issue with ABI parameter parsing affecting Simulation functionality
- [feat] Auto-fetch gasPrice for Simulation

### v4.0.0

- [feat] Add support for multiple new chains including Base, Linea, Polygon zkEVM
- [feat] Optimize and adjust tool entry points and layout

### v3.7.0

- [feat] Preview of v4 version

### v3.6.0

- [feat] Improve MetaSuites's Dedaub Support
- [build] Configure GitHub Actions for automated workflows
- [fix] Fix evm.storage to only support Ethereum chain
- [fix] Fix the issue of the supported website list becoming invalid in the settings

### v3.5.0

- [feat] Change logo
- [feat] Update to support the new appearance of BNB Chain

### v3.4.2

- [fix] Fix some style issues
- [fix] Fix permission control for the Logs button inside private variables

### v3.4.1

- [feat] Enable address redirection in variable logs popup
- [feat] Prioritize redirection to Phalcon for transaction hashes
- [fix] Phalcon no longer supports Cronos scan

### v3.4.0

- [feat] Support for contract variable logs query
- [fix] Fix bugs related to the settings and simulator

### v3.3.0

- [feat] Introduce transaction simulation support
- [fix] Resolve bugs related to private variables and forta alerts

### v3.2.0

- [feat] Support for viewing Fantom transactions on Phalcon

### v3.1.0

- [feat] Introduce evm.storage shortcut in the contract tab
- [feat] Add implementation contract shortcut in the proxy contract label

### v3.0.2

- [fix] Resolve an issue causing rarity tags to render multiple times
- [fix] Mobile radar chart now correctly implements line breaks

### v3.0.1

- [style] ui

### v3.0.0

- [feat] Support Transaction Explanation
- [feat] Compatible with Mises browser

### v2.4.3

- [feat] Adapt to block_forked pages
- [feat] Add Gitcoin entry to popup
- [feat] Add compatibility with Safari

### v2.4.2

- [fix] Fixed some style issues and tag display bugs.

### v2.4.1

- [feat] Proxy logs now support several other EVM chains.

### v2.4.0

- [feat] Add proxy log on Etherscan and Bscscan
- [feat] Support reporting label issues
- [fix] Fix some bugs on evm-compatible chains

### v2.3.4

- [fix] Fix some bugs related to button display
- [fix] Adapt to tokentnxs, nft-transfers and txsInternal pages
- [perf] Optimize nametag display

### v2.3.1

- [feat] Add compatibility with Firefox
- [feat] Support private variables on the read contract tab
- [feat] Support formatting parameters on the write contract tab
- [feat] Add NFT marketplace shortcuts
- [feat] Enhance quick copy

### v2.2.0

- [feat] Display labels from Forta bots
- [feat] Mark suspicious transactions based on Forta alert
- [feat] Support Approval Diagnosis

### v2.1.0

- [feat]: Enhance the Token Approval of blockchain explorers
- [fix]: Fix some issues when copying some items
- [feat]: Adjust the style of labels
- [feat]: Integrate approval diagnosis into search service

### v2.0.0

- [feat] Adapted to the new version of etherscan
- [build] Turn off code obfuscation

### v1.6.1

- [fix] A bug related to the conflict with tenderly extension
- [feat] Support copy opcodes

### v1.6.0

- [feat] Support export current page data
- [feat] Integrate Eden Network and Flashbots Explorer
- [feat] Update fund flow map, add button of MetaSleuth

### v1.5.0

- [feat] Optimized search shortcuts feature
- [fix] Fixed issue with button style misalignment
- [fix] Supports inputting spaces for search
- [fix] Fixed address copying bug
- [fix] Fixed Ethervm button issue
- [fix] Fixed snowtrace dethcode button bug

### v1.4.0

- [feat] NFTgo quick jump feature - Etherscan
- [feat] display funding source of deployer's - Etherscan
- [feat] NFT floor price feature - Etherscan
- [feat] Ethervm integration for contract - Etherscan
- [feat] Enhanced rarity feature - Opensea
- [feat] Enhanced holder address label - Opensea
- [feat] Risk assessment radar chart for collections - Opensea
- [perf] Optimized custom settings function
- [perf] Improved search functionality interaction
- [fix] Fixed Certain display bugs
- [fix] Fixed bug with fundflow jumping

### v1.3.1

- [feat] Show quick open in DethCode
- [feat] Alternative watermark on the fund flow chart
- [feat] Support PNG format output of fund flow chart

### v1.3.0

- [feat] All in one dock for blockchain explorers
- [feat] More Flexible Fund Flow Chart
- [feat] More Friendly experience on \*scan
