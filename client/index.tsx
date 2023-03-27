import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
})
