import React from "react";
import ControlBtns from "./controlBtns";
import "./task.css";

const Task = ({ task, taskOperations }) => {
  function formatCompletion(completed) {
    return completed ? "bg-success" : "bg-danger";
  }
  function renderText() {
    if (task.editing) {
      return <input type="text" id="editing-input" defaultValue={task.text} />;
    } else {
      return <p className="text">{task.text}</p>;
    }
  }
  return (
    <div className={"task " + formatCompletion(task.completed)}>
      {renderText()}
      <ControlBtns task={task} taskOperations={taskOperations} />
    </div>
  );
};

export default Task;
