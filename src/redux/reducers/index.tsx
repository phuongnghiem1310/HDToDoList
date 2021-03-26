import { combineReducers } from "redux";
import ToDoListReducer  from "./ToDoList/reducer";

const rootReducer = combineReducers({
    ToDoListReducer,
})

export default rootReducer;