
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes'
import { Provider } from 'react-redux'
import { store } from './app/store'
  import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(

   <Provider store={store}>
     <AppRoutes/>
     <ToastContainer position="top-right"/>
   </Provider>
  
)
