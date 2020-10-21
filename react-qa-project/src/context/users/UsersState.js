import React, { useReducer} from "react";
import axios from "axios";
import UsersContext from "./usersContext";
import UsersReducer from "./usersReducer";
import { GET_USERS, GET_USER, SET_LOADING } from "../types";

const UserState = (props) => {

  const initialState = {
    users: [],
    user: null,
    loading: false,
    error: {},
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

  // Get users
  const getUsers = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get("http://localhost:8000/api/users");
      console.log(res);
      dispatch({
        type: GET_USERS,
        payload: res.data.result,
      });
    } catch (err) {
      //   dispatch({
      //     type: USER_ERROR,
      //     payload: { msg: err.response.statusText},
      //   });
    }
  };

  // Get user
  const getUser = async (id) => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get(`http://localhost:8000/api/users/${id}`);
      console.log(res);

      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      //   dispatch({
      //     type: USER_ERROR,
      //     payload: { msg: err.response.statusText, status: err.response.status },
      //   });
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        error: state.error,
        getUsers,
        getUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UserState;
