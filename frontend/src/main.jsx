import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { UserProvider } from "@/utils/UserContext";
import { ThemeProvider } from "@/utils/ThemeContext";
import App from './App.jsx';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SuccessMessageProvider } from "@/utils/SuccessMessageContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <SuccessMessageProvider>
            <App />
          </SuccessMessageProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
