import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SocketProvider } from "./context/socketContext";
import { DataProvider } from "./context/dataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </DataProvider>
  </React.StrictMode>
);
