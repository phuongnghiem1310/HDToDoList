import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";

export function* rootSaga(){
    yield all([
        ToDoListSaga.watchGetTaskApi(),
        ToDoListSaga.watchAddTaskApi(),
        ToDoListSaga.watchDeleteTaskApi(),
        ToDoListSaga.watchEditTaskApi(),
    ])
}