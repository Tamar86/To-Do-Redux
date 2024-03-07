import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleCompleted } from "../store/slice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
//declaring functional component TodoItems that receives content and completed as props
const ToDoItems = ({ content, completed }) => {
  //initializing the dispatch function from Redux store
  const dispatch = useDispatch();
  //using the useState hook to manage component state
  //editedContent represents the content being edited in the modal
  const [editedContent, setEditedContent] = useState(content);
  //holds a warning message for invalid input during editing
  const [warning, setWarning] = useState("");
  //controls the visibility of Bootstrap modal for editing
  const [showModal, setShowModal] = useState(false);

  //Event handlers:
  //handles the deletion of the todo item by dispatching the deleteTodo action with the content to be deleted
  const handleDelete = () => {
    dispatch(deleteTodo({ content }));
  };
  //manages the saving of edited content by dispatching the editTodo action with the old and new content
  const handleEditSave = () => {
    if (editedContent.trim() !== "") {
      dispatch(editTodo({ content, newContent: editedContent }));
      setShowModal(false);
    } else {
      setWarning("Please enter a valid value.");
    }
  };
  // toggles the completion status of the todo item by dispatching the toggleCompleted action
  const handleToggleCompleted = () => {
    dispatch(toggleCompleted({ content }));
  };
  //cancels the editing process, resettig the edited content and hiding modal
  const handleEditCancel = () => {
    setEditedContent(content);
    setWarning("");
    setShowModal(false);
  };
  //the component returns jsx representing the todo item
  return (
    // the class is conditionally applied based on completion status
    <div className={`todo-item ${completed ? "completed" : ""}`}>
      <p>
        {/* checkbox for making completion with onchange event triggering handleToggleCompleted status */}
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggleCompleted}
        />
        {content}
      </p>
      {completed || (
        <>
        {/* delete and complete buttons are conditionally displayed based on the completion status  */}
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            style={{ marginLeft: "5px" }}
          >
            Edit
          </Button>
        </>
      )}

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* input field for editing content and warning message for invalid input */}
          <input
            type="text"
            className="form-control"
            value={editedContent}
            onChange={(e) => {
              setEditedContent(e.target.value);

              setWarning("");
            }}
          />
          {warning && <div className="alert alert-danger mt-2">{warning}</div>}
        </Modal.Body>
        <Modal.Footer>
          {/* footer section of the modal containing Cancel and Save Changes button */}
          <Button variant="secondary" onClick={handleEditCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ToDoItems;
