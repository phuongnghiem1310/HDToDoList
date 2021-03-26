import * as ActionType from "./constant";

let initialState: any = {
  isLoading: false,
  taskList: [],
  taskEdit: null,
};

const ToDoListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SET_TASK_API:
      state.taskList = action.taskList;
      return { ...state };

    case ActionType.DISPLAY_LOADING:
      state.isLoading = true;
      return { ...state };

    case ActionType.HIDE_LOADING:
      state.isLoading = false;
      return { ...state };

    case ActionType.SET_EDIT_TASK:
      let newState = {...state, taskEdit: action.task};
      state = newState;
      return { ...state };

    default:
      return { ...state };
  }
};

export default ToDoListReducer;
