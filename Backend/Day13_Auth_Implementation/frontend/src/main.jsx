
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes.jsx'
import { ContextProvider } from './context/MyContext.jsx'

createRoot(document.getElementById('root')).render(
   <ContextProvider>
    <AppRoutes/>
   </ContextProvider>
)
