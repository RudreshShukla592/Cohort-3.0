
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MyShopContextProvider } from './context/MyWebsite.jsx'

createRoot(document.getElementById('root')).render(
  <MyShopContextProvider>
    <App/>
  </MyShopContextProvider>
  
)
