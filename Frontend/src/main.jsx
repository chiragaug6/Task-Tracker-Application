import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";
// import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </BrowserRouter>
  </Provider>
);
