import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ConfigProvider } from "antd";
import theme from "@/themes/antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
