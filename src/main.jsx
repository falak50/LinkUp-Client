import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import {  HelmetProvider } from 'react-helmet-async';
import AuthProviders from './providers/AuthProviders';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
     <AuthProviders>
      
      <ToastContainer />
        <QueryClientProvider client={queryClient}>
          <div className='bg-[#f4f2ee] '>
              <RouterProvider router={router} />
          </div>           
        </QueryClientProvider>  
        
     
     </AuthProviders>
     </HelmetProvider>
   </React.StrictMode>,
)
