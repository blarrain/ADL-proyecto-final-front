import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/scss/main.scss'
// import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/userContext.jsx';
import CartProvider from "./context/CartContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
