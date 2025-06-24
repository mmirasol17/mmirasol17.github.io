import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import "./styles/animations.css";
import { Page } from "./components/Page";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
