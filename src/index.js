import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoApp from './components/todo-app'
import "bootstrap/dist/css/bootstrap.css";
ReactDOM.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
  document.getElementById("root")
);
