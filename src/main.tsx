import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { migrate } from "./core/db.ts";

async function bootUp() {
  await migrate();
}

async function runApp() {
  await bootUp();
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

runApp();
