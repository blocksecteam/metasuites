import { createRoot } from 'react-dom/client'

import '@common/styles/internal.common'
import '@src/i18next'

import App from './App'

createRoot(document.getElementById('root')!).render(<App />)
