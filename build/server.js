import { spawn, exec } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { rimrafSync } from 'rimraf'

// TODO: hrm

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

/**
 * generate firefox manifest
 * @param filepath: manifest file path
 * @param interval: loop interval
 */
const transformFirefoxManifest = function (filepath, interval) {
  fs.access(filepath, fs.constants.F_OK, err => {
    if (err) {
      setTimeout(() => transformFirefoxManifest(filepath, interval), interval)
    } else {
      exec('node build/firefox.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
        }
      })
    }
  })
}

// empty dist dir
rimrafSync(path.join(__dirname, '../dist'))

// exec yarn dev
const viteProcess = spawn('vite', ['--mode', 'development'])

// get platform argv
const platform = process.argv.slice(2)[0]

viteProcess.stdout.on('data', async data => {
  console.log(data.toString())
  if (data.includes('ready')) {
    if (platform === 'firefox') {
      transformFirefoxManifest(
        path.join(__dirname, '../dist', 'manifest.json'),
        500
      )
    }
  }
})
