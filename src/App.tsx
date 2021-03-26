import { isBuffer } from "node:util";
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
import ToDoList from "./ToDoList";

export const AuthContext = React.createContext<Partial<ContextProps>>({});
export const useAuthContext = () => useContext(AuthContext);

interface ContextProps {
  isAuthenticated: boolean,
  username: string,
  state:any,
  dispatchAuth: any
}

const initialState = {
  isAuthenticated: false,
  username: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("username",action.payload);
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        username: "null",
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatchAuth] = React.useReducer(reducer, initialState);
  
  if(localStorage.getItem("username")){
    state.isAuthenticated = true;
  }

  return (
    <AuthContext.Provider value={{state, dispatchAuth}}>
      <Switch>

        <Route exact path="/" component={LoginComponent} />
        <Route path="/todolist" component={ToDoList} />
        
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
