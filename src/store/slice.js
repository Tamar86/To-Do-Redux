import { createSlice } from "@reduxjs/toolkit";
//create slice using createSlice from redux toolkit. The createSlice function from Redux Toolkit is used to
//create a "slice" of the Redux store. a slice includes the reducer function and the generated action creators.
const todoSlice = createSlice({
    //this is the name of the slice and it is used as prefix for action types generated by Redux Toolkit
    name: 'todos',
    // the initial state for this slice, containing a list of two to-do items
    initialState: {
        list: [
            {content: "content1", completed: false},
            {content: "content2", completed: false},
        ],
    },
    // this is an object containing containing reducer function. Reducers are responsible for modifying the
    //the state based on dispatched items
    reducers: {
        //adds a new to-do item to the list array in the state
        //it accesses the list array in the state and pushes a new object with content taken from the
        //action payload and completed set to false
        addTodo: (state, action)=> {
            state.list.push({
                content:
                action.payload.content,
                completed: false,
            });

        },
// deletes a to do item from the list array in the state based on its content.
//uses the filtered method to create a new array excluding the to-do with the specific content
//updates the list array with the new filtered array
        deleteTodo: (state, action) => {
            console.log('state', state)
            console.log('action', action)
            console.log('state.list', state.list)
           // console.log('todo', todo)
            //console.log('todo.content', todo.content)
            console.log('action.payload.content', action.payload.content)
            state.list = state.list.filter((todo) => todo.content !== action.payload.content);
        },
        //modifies the content of a todo item in the list array based on its content
        //finds the todo item with the specific content using the find method.
        // if the to-do is found, updates its content property with the new content from action payload
        editTodo: (state, action) => {
            const todoToEdit = state.list.find((todo) => todo.content === action.payload.content);
            if(todoToEdit){
                todoToEdit.content = action.payload.newContent
            }
        },
        // toggles the completed status of a to do item in the list array based on its content
        // finds the to-do item with the specified content using the find method
        //if the to-do is found , toggles its completed property
        toggleCompleted: (state, action) => {
            console.log('Toggling in slice', action.payload)
            const todoToToggle = state.list.find((todo) => todo.content === action.payload.content);
            if(todoToToggle){
                todoToToggle.completed =!todoToToggle.completed
            } 
        },
        
        
        
        
        //these reducers are called when i dispatch actions(e.g dispatch (addTodo(...))) from my components
        //they modify the state of to-do list based on action and its payload.
    }
})

export const {addTodo, deleteTodo, editTodo, toggleCompleted} = todoSlice.actions;
export default todoSlice.reducer