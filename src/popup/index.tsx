import { createRoot } from 'react-dom/client'

import '@common/styles/internal.common'

import App from './App'

createRoot(document.getElementById('root')!).render(<App />)
