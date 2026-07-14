import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Design system SLEP Colchagua: tokens primero, luego kit de componentes e iconos
import '@slep-colchagua/design-system'
import '@slep-colchagua/design-system/components'
import '@slep-colchagua/design-system/icons'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
