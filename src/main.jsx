import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import OrderProvider from "./context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <OrderProvider>
        <App />
      </OrderProvider>
    </Router>
  </StrictMode>
);
