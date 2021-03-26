import { call, takeLatest, put, delay } from "@redux-saga/core/effects";
import Axios from "axios";
import * as ActionType from "./../reducers/ToDoList/constant";
import { ToDoListService } from "./../../services/TodoListService";

// Lay danh sach task

function* getTaskApi(action: any) {
  yield put({
    type: ActionType.DISPLAY_LOADING,
  });

  let { data, status } = yield call(ToDoListService.getTaskApi);

  yield put({
    type: ActionType.SET_TASK_API,
    taskList: data,
  });

  yield put({
    type: ActionType.HIDE_LOADING,
  });
}

export function* watchGetTaskApi() {
  yield takeLatest(ActionType.GET_TASK_API, getTaskApi);
}

// Them Task

function* AddTaskApi(action: any) {
  const { taskname } = action.data;
  // const task:object = {taskName:taskname}
  try {
    yield put({
      type: ActionType.DISPLAY_LOADING,
    });

    let { data, status } = yield call(() => {
      return ToDoListService.addTaskApi(taskname);
    });

    if (status === 201) {
      yield put({
        type: ActionType.GET_TASK_API,
      });

      yield put({
        type: ActionType.HIDE_LOADING,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* watchAddTaskApi() {
  yield takeLatest(ActionType.ADD_TASK_API, AddTaskApi);
}

//Delete Task

function* deleteTaskApi(action: any) {
  const { id } = action.data;

  try {
    yield put({
      type: ActionType.DISPLAY_LOADING,
    });

    let { status } = yield call(() => {
      return ToDoListService.deleteTaskApi(id);
    });

    if (status === 200) {
      yield put({
        type: ActionType.GET_TASK_API,
      });

      yield put({
        type: ActionType.HIDE_LOADING,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* watchDeleteTaskApi() {
  yield takeLatest(ActionType.DELETE_TASK_API, deleteTaskApi);
}

// Edit task

function* editTaskApi(action: any) {
  const task = action.data;

  try {
    yield put({
      type: ActionType.DISPLAY_LOADING,
    });
    let { status } = yield call(() => {
      return ToDoListService.editTaskApi(task);
    });
    if (status === 200) {
      yield put({
        type: ActionType.GET_TASK_API,
      });

      yield put({
        type: ActionType.HIDE_LOADING,
      });
    }
  } catch (err) {
    console.log(err);
  }

  yield call(() => {
    return ToDoListService.editTaskApi(task);
  });
}

export function* watchEditTaskApi() {
  yield takeLatest(ActionType.EDIT_TASK_API, editTaskApi);
}
