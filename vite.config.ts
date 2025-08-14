import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import { visualizer } from 'rollup-plugin-visualizer'

import manifest from './manifest.config'

const r = (...args: string[]) => resolve(__dirname, ...args)

const port = parseInt(process.env.PORT || '') || 3303

/**
 * more configuration see 👉🏻 https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      /**
       * doc: https://crxjs.dev/vite-plugin/
       */
      crx({ manifest }),
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true
      })
    ],
    resolve: {
      alias: {
        '@src': `${r('src')}/`,
        '@common': `${r('src/common')}/`
      }
    },
    server: {
      port,
      open: ''
    },
    build: {
      outDir: 'dist/dev',
      sourcemap: false,
      assetsDir: 'bundle',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        },
        keep_fnames: true,
        keep_classnames: true,
        mangle: false
      },
      rollupOptions: {
        input: {
          policy: 'src/pages/PrivacyPolicy/index.html'
        },
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return
          }
          warn(warning)
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/rc-')) {
              return 'rc-vendor'
            }
            if (id.includes('node_modules/d3-graphviz')) {
              return 'd3-graphviz'
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {}
        }
      }
    }
  }
})
