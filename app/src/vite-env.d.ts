/// <reference types="vite/client" />

declare module '*.php?raw' {
  const src: string
  export default src
}

declare module '@php-wasm/web-8-0' {
  export function getPHPLoaderModule(): Promise<{
    dependencyFilename?: string
    dependenciesTotalSize?: number
  }>
  export function getIntlExtensionPath(): Promise<string>
}
