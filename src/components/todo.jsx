import React, { Component } from "react";
import Task from "./task";
import axios from "axios";
import './todo.css'

window.axios = axios;

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      headers: { 'Authorization': `Token ${props.token}` },
      isLoaded: false,
    };
  }

  componentDidMount() {
    var obj = this;
    console.log(this.state.token)
    axios
      .get("http://localhost:8000/api/task/all/", { headers: this.state.headers })
      .then((res) => obj.setState({ tasks: res.data, isLoaded: true }))
      .then((err) => console.log(err));
    // fetch("http://localhost:8000/api/task/all/")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     this.setState({ tasks: json, isLoaded: true });
    //   });
  }

  defaultTask = {
    text: "New Task",
    completed: false,
  };
  taskOperations = {
    onTaskComplete: (task) => {
      let tasks = [...this.state.tasks];
      let taskIndex = tasks.indexOf(tasks.find((t) => t.id === task.id));

      var newTask = { ...task, completed: task.completed ? false : true };
      var obj = this;
      axios
        .put(`http://127.0.0.1:8000/api/task/${task.id}/update/`, newTask, { headers: this.state.headers })
        .then((res) => {
          tasks[taskIndex].completed = tasks[taskIndex].completed
            ? false
            : true;
          obj.setState({ tasks });
        });
    },
    onTaskDelete: (deletedTask) => {
      var obj = this;
      let tasks = this.state.tasks.filter((task) => task.id !== deletedTask.id);
      axios
        .delete(`http://127.0.0.1:8000/api/task/${deletedTask.id}/delete/`, { headers: this.state.headers })
        .then((res) => {
          obj.setState({ tasks });
        })
        .catch((err) => console.log(err));
    },
    onTaskEdit: (taskID) => {
      let tasks = [...this.state.tasks];

      let oldEditingTask = tasks.find((task) => task.editing === true);

      tasks[tasks.indexOf(oldEditingTask)] = {
        ...oldEditingTask,
        editing: false,
      };

      let editingTask = tasks.find((task) => task.id === taskID);
      tasks[tasks.indexOf(editingTask)] = {
        ...editingTask,
        editing: true,
      };

      this.setState({ tasks });
    },
    onTaskUpdate: (task, text) => {
      let tasks = [...this.state.tasks];
      var newTask = { ...task, text: text, editing: false };
      axios
        .put(`http://127.0.0.1:8000/api/task/${task.id}/update/`, newTask, { headers: this.state.headers })
        .then((res) => {
          tasks[tasks.indexOf(task)] = newTask;
          this.setState({ tasks });
        })
        .catch((err) => console.log(err));
    },
  };
  addTask = () => {
    let tasks = [...this.state.tasks];
    axios
      .post("http://127.0.0.1:8000/api/task/create/", this.defaultTask, { headers: this.state.headers })
      .then((res) => {
        let newTask = { ...this.defaultTask };
        newTask.id = res.data.id;
        tasks.push(newTask);
        this.setState({ tasks });
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="container-md">
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div className="">
        <div>
          {this.state.tasks.map((task, id) => {
            return (
              <Task
                key={task.id}
                task={task}
                taskOperations={this.taskOperations}
              />
            );
          })}
        </div>

        <button onClick={this.addTask} className="btn btn-primary float-right">
          Add
        </button>
      </div>
    );
  }
}

export default Todo;
