import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, useLocation } from "react-router-dom";
import App from "./App";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
          <div className="flex">
            <Sidebar />
            <div className="h-screen flex-1">
              <Navbar />
              <div className="h-[84vh] overflow-y-auto">
                <App />
              </div>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);
