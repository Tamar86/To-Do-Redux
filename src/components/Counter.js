
import React from "react";
//importing the useSelector hook from react-redux library
//the useSelector hook is used to extract data from redux store state. in this case from slice.js
import { useSelector } from "react-redux";
//functional component Counter
export default function Counter() {
    //here, the useSelector is used to access the Redux store state
    //the useSelector hook takes a selector function as an argument, which receives the entire Redux state as its parameter
    //the function than extracts the list property from the todos slice of the state
  const todos = useSelector((state) => state.todos.list);
// the total number of to-do items is determined by todos.length
  return (
    <h2
      style={{
        position: "fixed",
        border: "10px solid white",
        borderRadius: "5px",
        marginLeft: "30%",
        marginTop: '13%',
        backgroundColor: "red",
        color: "white",
        padding: '10px'
      }}
    >
      Total: {todos.length}
    </h2>
  );
}
