import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
function defineSafariManifestV2(manifestPath) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath))
  manifest.manifest_version = 2
  manifest.background = {
    page: 'background.html'
  }
  manifest.web_accessible_resources = manifest.web_accessible_resources
    .map(item => item.resources || item)
    .flat()
  if (manifest.action) {
    manifest.browser_action = manifest.action
    delete manifest.action
  }
  if (manifest.host_permissions) {
    manifest.permissions = [
      ...manifest.permissions,
      ...manifest.host_permissions
    ]
    delete manifest.host_permissions
  }
  manifest.description =
    'Help crypto users explore blockchain smoothly. Improve the usability of blockchain explorers like Etherscan.'
  manifest.content_security_policy =
    "script-src 'self' 'unsafe-eval' http://localhost:3303; object-src 'self';"
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
}

function main() {
  // Copy background.html to dist/
  fs.cp(
    path.join(__dirname, './', 'background.html'),
    path.join(__dirname, '../dist/safari-extension', 'background.html'),
    err => {
      if (err) throw err
    }
  )

  // Smooth out the differences in the configuration file: chrome v3 => firefox v2
  // TODO: Upgrade to firefox v3
  defineSafariManifestV2(
    path.join(__dirname, '../dist/safari-extension', 'manifest.json')
  )
}

main()
