
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CreateProvider } from './context/RecipeContext.jsx'

createRoot(document.getElementById('root')).render(
  
   <CreateProvider>
    <App/>
   </CreateProvider>

)
