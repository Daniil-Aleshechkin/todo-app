import React from "react";

const ControlBtns = ({ task, taskOperations }) => {
  function renderEdit() {
    if (task.editing) {
      return (
        <button
          onClick={() => {
            taskOperations.onTaskUpdate(
              task,
              document.getElementById("editing-input").value
            );
          }}
          className="btn btn-primary m-2"
        >
          Update
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            taskOperations.onTaskEdit(task.id);
          }}
          className="btn btn-primary m-2"
        >
          Edit
        </button>
      );
    }
  }

  return (
    <div className="control-btns">
      <button
        onClick={() => {
          taskOperations.onTaskComplete(task);
        }}
        className="btn btn-primary m-2"
      >
        Mark completed
      </button>
      {renderEdit()}
      <button
        onClick={() => {
          taskOperations.onTaskDelete(task);
        }}
        className="btn btn-warning m-2"
      >
        Delete
      </button>
    </div>
  );
};

export default ControlBtns;
