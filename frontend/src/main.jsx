import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import { UserContextProvider } from './context/userContext.jsx'
import Router from './routing/Router.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
       <Router/>
    </UserContextProvider>
  </StrictMode>,
)
