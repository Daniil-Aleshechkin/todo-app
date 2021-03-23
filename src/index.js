import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Todo from "./components/todo";
import "bootstrap/dist/css/bootstrap.css";
ReactDOM.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>,
  document.getElementById("root")
);
