import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/styles.scss'
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from './context/userContext.tsx';
import { PrivacySectionContexProvider } from './context/privacySections.context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <PrivacySectionContexProvider>
    <App />
    </PrivacySectionContexProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
