import React, { useReducer, useContext } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import alertContext from "../alert/alertContext";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_LOADING,
} from "../types";

const PostsState = (props) => {
  const { setAlert } = useContext(alertContext);

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false,
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    const token = localStorage.token ? localStorage.token : "";
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }

    dispatch({ type: SET_LOADING });

    try {
      const res = await axios.get("http://localhost:8000/api/auth");
      console.log(res.data);

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Login User
  const login = async ({ email, password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    dispatch({ type: SET_LOADING });

    try {
      //   const res = await axios.post("/api/auth", body, config);
      const res = await axios.post(
        "http://localhost:8000/api/auth",
        body,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.result,
      });

      // setAlert((res.data.message = "success message"), "success");

      loadUser();
      // dispatch(loadUser());
    } catch (err) {
      console.log(err.response);
      if(err.response.status === 401) setAlert("Incorrect username or password.", "danger");

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  // Register User
  const register = async ({ name, email, password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    dispatch({ type: SET_LOADING });

    try {
      const res = await axios.post(
        "http://localhost:8000/api/authRegister",
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.result,
      });

      setAlert("User registration Successful!", "success");
      //   dispatch(loadUser());

    } catch (err) {
      console.log(err.response);
      if(err.response.status === 401) setAlert("Something went wrong, User Registration failed", "danger");

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

  //LOGOUT
  const logout = () => {
    // setAlert("User has logged out", "success");
    // dispatch({ type: SET_LOADING });
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default PostsState;
