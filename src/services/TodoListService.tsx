import axios from "axios";
import { DOMAIN } from "./../api";

class TodoListService {
  constructor() {}

  getTaskApi = () => {
    return axios({
      url: `${DOMAIN}`,
      method: "GET",
    });
  };

  addTaskApi = (taskname: string) => {
    return axios({
      url: `${DOMAIN}`,
      method: "POST",
      data: {taskName: taskname}
    });
  };

  deleteTaskApi = (id:string) => {
    return axios({
      url: `${DOMAIN}/${id}`,
      method: "DELETE",
    });
  };

  editTaskApi = (task:any) => {
    return axios({
      url: `${DOMAIN}/${task.id}`,
      method: "PUT",
      data: {taskName: task.taskName}
    });
  };
}

export const ToDoListService = new TodoListService();
