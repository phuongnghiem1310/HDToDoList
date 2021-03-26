import React, { useContext, useState } from "react";
import { Button } from "../../StyledComponent/Components/Button";
import { Container } from "../../StyledComponent/Containers/Container";
import { useAuthContext } from "./../../App";
import { Redirect } from "react-router-dom";

import AuthContext from "./../../App";
import ToDoList from "../../ToDoList";

interface Props {
  history: any;
}

const LoginComponent: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatchAuth } = useAuthContext();

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (username === "admin" && password === "123") {
        dispatchAuth({
        type: "LOGIN",
        payload: username,
      });
      props.history.replace("/todolist");
    }
  };

  if(state.isAuthenticated) {
      return <Redirect to="/todolist" />
  }

  return (
    <Container className="mt-5 p-5" style={{ borderRadius: 10, width: "30%" }}>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>User name</label>
          <input
            name="username"
            className="form-control"
            type="text"
            placeholder="admin"
            onChange={handleOnChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            className="form-control"
            type="password"
            placeholder="123"
            onChange={handleOnChange}
          />
        </div>

        <div className="text-center mt-4">
          <Button className="px-4" style={{ borderRadius: 5 }}>
            Login
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginComponent;
