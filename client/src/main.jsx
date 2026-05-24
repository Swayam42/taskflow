import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3200,
              style: {
                background: "#111111",
                color: "#ffffff",
                border: "1px solid #262626",
                borderRadius: "14px",
                boxShadow: "0 18px 40px rgba(0, 0, 0, 0.16)",
                fontSize: "14px"
              },
              iconTheme: {
                primary: "#ffffff",
                secondary: "#111111"
              }
            }}
          />
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
