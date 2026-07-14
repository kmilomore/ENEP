/// <reference types="vite/client" />

// El design system exporta hojas de estilo y assets, no módulos TS
declare module '@slep-colchagua/design-system'
declare module '@slep-colchagua/design-system/components'
declare module '@slep-colchagua/design-system/icons'
declare module '@slep-colchagua/design-system/icons/government'
declare module '@slep-colchagua/design-system/assets/*' {
  const url: string
  export default url
}
