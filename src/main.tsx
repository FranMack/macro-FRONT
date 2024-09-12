import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { PrivacySectionContexProvider } from "./context/privacySections.context.tsx";
import { UserContextProvider } from "./context/userContext.tsx";
import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <PrivacySectionContexProvider>
          <App />
        </PrivacySectionContexProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
