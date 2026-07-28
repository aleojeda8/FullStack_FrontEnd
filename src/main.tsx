import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// styles
import '@/styles/global.css'
import '@/styles/variables.css'

//App
import App from '@/App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
