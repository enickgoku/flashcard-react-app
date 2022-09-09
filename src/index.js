import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DecksProvider } from "./hooks/useDecks";

ReactDOM.render(
  <React.StrictMode>
    <DecksProvider>
      <Router>
        <App />
      </Router>
    </DecksProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
