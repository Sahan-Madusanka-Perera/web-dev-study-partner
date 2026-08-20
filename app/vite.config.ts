import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * @php-wasm/web ships every PHP version from 5.2 to 8.5 behind a
 * dynamic-import switch. We only ever ask for 8.0, so the rest are
 * replaced with a throwing stub — otherwise the bundler drags a
 * quarter of a gigabyte of unused `.wasm` into the build.
 */
const UNUSED_PHP = /^@php-wasm\/web-(5-2|7-4|8-1|8-2|8-3|8-4|8-5)$/

/**
 * php-wasm's loaders do `import wasmUrl from './php_8_0.wasm'` and expect a
 * URL back. Vite reserves bare `.wasm` imports for instantiation, so point
 * those specifiers at the `?url` form instead.
 */
function phpWasmAsUrl(): Plugin {
  const INTL_STUB = '\0php-intl-stub'
  return {
    name: 'wdsp:php-wasm-as-url',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!importer || !/@php-wasm|php_\d_\d/.test(importer)) return null
      // The intl extension is never enabled here; its .so files and the
      // 30 MB ICU data table would otherwise ride along in the build.
      if (/extensions\/intl\/intl\.so|shared\/icu\.dat/.test(source)) return INTL_STUB
      if (!/\.(wasm|so|dat)$/.test(source)) return null
      const resolved = await this.resolve(source + '?url', importer, { ...options, skipSelf: true })
      return resolved ?? null
    },
    load(id) {
      if (id === INTL_STUB) return 'export default ""'
      return null
    },
  }
}

function trimPhpVersions(): Plugin {
  const STUB = '\0php-version-stub'
  return {
    name: 'wdsp:trim-php-versions',
    enforce: 'pre',
    resolveId(source) {
      if (UNUSED_PHP.test(source)) return STUB
      return null
    },
    load(id) {
      if (id === STUB) {
        return `export function getPHPLoaderModule() {
  throw new Error('This PHP version is not bundled by Web Dev Study Partner.')
}
export function getIntlExtensionPath() {
  throw new Error('The intl extension is not bundled.')
}
export const jspi = async () => false
export default {}`
      }
      return null
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [phpWasmAsUrl(), trimPhpVersions(), react(), tailwindcss()],
  assetsInclude: ['**/*.so', '**/*.wasm', '**/*.dat'],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 4000,
    assetsInlineLimit: 2048,
  },
  optimizeDeps: {
    // The php-wasm packages must stay unbundled (they resolve their own
    // .wasm and .so assets); their CommonJS leaf deps still need converting.
    exclude: ['@php-wasm/web', '@php-wasm/universal', '@php-wasm/web-8-0'],
    include: ['ini'],
  },
  worker: { format: 'es' },
})
