// importing necessary React components, hooks, Bootstrap, and action(addTodo) from redux store

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToDoItems from "./ToDoItem";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addTodo } from "../store/slice";
import icon from "./images/info_icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
// declaring functional component ToDoList
const ToDoList = () => {
  //obtaining the dispatch function from Redux store
  const dispatch = useDispatch();
  //extracting the list of todos from redux store using useSelector
  const todos = useSelector((state) => state.todos.list);
  //initializing component state using the useState hook
  //controls the visibility of the bootstrap modal for adding new todos
  const [showAddModal, setShowAddModal] = useState(false);
  //represents the content of the new todo being added
  const [newTodo, setNewTodo] = useState("");
  //holds a warning message for invalid input during todo addition
  const [warning, setWarning] = useState("");
  //controls the visibility of the information modal
  const [show, setShow] = useState(false);

  //event handlers:
  //manages the visibility of the information modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //handles the addition of a new todo by dispatching the addTodo action
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo({ content: newTodo, completed: false }));
      setShowAddModal(false);
      setNewTodo("");
    } else {
      setWarning("Please enter a valid value.");
    }
  };
  //cancels the addition of a new todo, resetting input and warnings
  const handleAddCancel = () => {
    setShowAddModal(false);
    setNewTodo("");
    setWarning("");
  };
  // the component returns jsx representing the entire ToDo list section

  return (
    // here i use inline css for styling
    <div
      style={{ backgroundColor: "black", color: "whitesmoke", padding: "20%" }}
    >
      {/* i wrap heading and information icon in span and add some css to display them horizontally next to each other */}
      <span className="container">
        <h2 className="item">Your ToDo App</h2>

        <img
          className="item"
          src={icon}
          alt="info Icon"
          onClick={handleShow}
          style={{
            cursor: "pointer",
            width: "30px",
            margin: "15px",
          }}
        />
      </span>
      {/* mapping over the todos array and rendering individual todo items  */}
      {todos.map((todo) => (
        <ToDoItems content={todo.content} completed={todo.completed} />
      ))}
      {/* a button triggers the visibility of of the bootstrap modal for adding new todos  */}
      <Button
        variant="success"
        onClick={() => setShowAddModal(true)}
        style={{ cursor: "pointer", marginLeft: "45%", marginTop: "15px" }}
      >
        Add
      </Button>

      {/* Bootstrap Modal for Add */}
      <Modal show={showAddModal} onHide={() => handleAddCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Add New To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter new to-do"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
              setWarning("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          />
          {warning && <div className="alert alert-danger mt-2">{warning}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTodo}>
            Add To-Do
          </Button>
        </Modal.Footer>
      </Modal>

      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            📚 Welcome to Your ToDo App! Explore these tips to make the most of
            your ToDo experience:
            <br />
            1. Adding a ToDo: - Click the "Add" button to insert new tasks. -
            Press "Enter" for quick entry.
            <br />
            2. Editing a ToDo: - Hit "Edit" to modify your tasks. - Save changes
            with the "Save" button.
            <br />
            3. Completing Tasks: - Check the box to mark tasks as complete. -
            Completed tasks are faded for clarity.
            <br />
            4. Deleting a ToDo: - Remove a task by clicking "Delete."
            <br />
            5. Additional Features: - Use the counter to track your tasks.
            <br />
            Enjoy organizing your ToDo list effortlessly!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default ToDoList;
