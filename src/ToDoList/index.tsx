import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../components/Loading/loadingComponent";
import { Button } from "../StyledComponent/Components/Button";
import { Heading3 } from "../StyledComponent/Components/Heading";
import { Input } from "../StyledComponent/Components/Input";
import { Label } from "../StyledComponent/Components/Label";
import { Table, Th, Thead, Tr } from "../StyledComponent/Components/Table";
import { Container } from "../StyledComponent/Containers/Container";
import * as ActionType from "./../redux/reducers/ToDoList/constant";
import "./style.css";
import { useForm, Controller } from "react-hook-form";

import { useAuthContext } from "./../App";
import { Redirect } from "react-router";
import ModalDelete from "./ModalDelete";

interface IFormData {
  taskName: string;
}

const ToDoList: React.FC = (props: any) => {
  const { register, errors, handleSubmit, control } = useForm<any>();
  const dispatch = useDispatch();
  const { state, dispatchAuth } = useAuthContext();
  const [task, setTask] = useState();
  let [taskName, setTaskName] = useState("");

  useEffect(() => {
    dispatch({
      type: ActionType.GET_TASK_API,
    });
  }, []);

  useEffect(() => {
    const { taskEdit } = props;
    if (taskEdit) {
      setTaskName(taskEdit.taskName);
    }
  }, [props.taskEdit]);

  const onSubmit = (data: IFormData) => {
    if (!props.taskEdit) {
      dispatch({
        type: ActionType.ADD_TASK_API,
        data,
      });
      setTaskName("");
    } else {
      let newTask = {
        id: props.taskEdit.id,
        taskName: taskName
      }
      dispatch({
        type: ActionType.EDIT_TASK_API,
        data: newTask,
      });
      setTaskName("");
    }
  };

  const handleLogout = () => {
    dispatchAuth({ type: "LOGOUT" });
  };

  const handleOnCorfirmDelete = (task: any) => {
    setTask(task);
  };

  const handleOnEdit = (task: any) => {
    dispatch({
      type: ActionType.SET_EDIT_TASK,
      task,
    });
  };

  const handleOnChange = (e: any) => {
    let { taskEdit } = props;
    let { name, value } = e.target;
    if (taskEdit) {
      
      let newTaskEdit = {
        id: taskEdit.id,
        taskName: value,
      };
      
      dispatch({
        type: ActionType.SET_EDIT_TASK,
        task: newTaskEdit,
      });
    } else {
      setTaskName(value);
    }
  };

  const deleteTaskName = () => {
    setTaskName("");
  }

  const renderTaskToDo = () => {
    let { taskList } = props;
    if (taskList && taskList.length > 0) {
      return taskList.map((task: any, index: number) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  handleOnEdit(task);
                }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                data-toggle="modal"
                data-target="#modalConfirmDelete"
                onClick={() => {
                  handleOnCorfirmDelete(task);
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
    }
  };

  if (!state.isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (props.isLoading) {
    return <LoadingComponent />;
  }

  const { taskEdit } = props;

  return (
    <>
      <Container className="w-50">
        <button className="btn btn-danger btnLogout" onClick={handleLogout}>
          Logout
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center mb-0">TO DO LIST</h1>
          <span>
            <Label>Task Name</Label>
            <br />

            {/* {taskEdit ? (
              <Input
                name="taskname"
                placeholder="Add Task"
                className="w-50"
                ref={register({ required: true })}
                onChange={handleOnChange}
                value={taskName}
              />
            ) : (
              <Input
                name="taskname"
                placeholder="Add Task"
                className="w-50"
                ref={register({ required: true })}
              />
            )} */}

            <Input
              name="taskname"
              placeholder="Add Task"
              className="w-50"
              ref={register({ required: true })}
              onChange={handleOnChange}
              value={taskName}
            />

            {props.taskEdit ? (
              <Button>Update Task</Button>
            ) : (
              <Button type="submit">Add Task</Button>
            )}
            {errors.taskname && errors.taskname.type === "required" && (
              <p className="text-danger">(*) Task name is required</p>
            )}
          </span>
          {/* <input type="submit" value="Add Task" /> */}
        </form>

        <Heading3 className="mt-5">Task to do</Heading3>
        <Table className="table">
          <Thead>{renderTaskToDo()}</Thead>
        </Table>
      </Container>
      {task ? <ModalDelete deleteTaskName={()=>deleteTaskName()} task={task} /> : ""}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    taskList: state.ToDoListReducer.taskList,
    isLoading: state.ToDoListReducer.isLoading,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps, null)(ToDoList);
