import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import FirebaseAuthContext from './Authentication/FirebaseAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseAuthContext>
      <RouterProvider router={router} />
    </FirebaseAuthContext>
  </StrictMode>,
)
