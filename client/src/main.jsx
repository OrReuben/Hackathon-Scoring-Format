import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SocketProvider } from "./context/socketContext";
import { DataProvider } from "./context/dataContext";
import { ApiProvider } from "./context/ApiContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider>
      <DataProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </DataProvider>
    </ApiProvider>
  </React.StrictMode>
);
