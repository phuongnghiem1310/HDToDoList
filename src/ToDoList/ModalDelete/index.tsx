import React from "react";
import { useDispatch } from "react-redux";
import * as ActionType from "./../../redux/reducers/ToDoList/constant";

interface Props {
  task: any;
  deleteTaskName: () => void;
}

const ModalDelete: React.FC<Props> = (props: any) => {
  const dispatch = useDispatch();

  const { task } = props;

  const handleOnDelete = () => {
      document.getElementById("closeConfirm")?.click();
      props.deleteTaskName();
      dispatch({
          type: ActionType.DELETE_TASK_API,
          data: task,
      })
      dispatch({
          type: ActionType.SET_EDIT_TASK,
          task: null
      })
  };

  return (
    <div
      className="modal fade"
      id="modalConfirmDelete"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document" style={{ top: "30%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Confirm Delete
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">Do you want to delete?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              id="closeConfirm"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleOnDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
