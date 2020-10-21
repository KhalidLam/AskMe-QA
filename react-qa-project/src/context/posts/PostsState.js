import React, { useReducer, useContext } from "react";
import axios from "axios";
import PostsContext from "./postsContext";
import PostsReducer from "./postsReducer";
import alertContext from "../alert/alertContext";
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  ADD_POST,
  DELETE_POST,
  SET_LOADING,
} from "../types";

const PostsState = (props) => {
  const { setAlert } = useContext(alertContext);

  const initialState = {
    posts: [],
    post: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  //   Get Top Posts
  const getTopPosts = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get("http://localhost:8000/api/questions");
      console.log("getTopPosts: ", res.data);

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      let errorMsg = "";
      let errorStatus = "";
      if (!err.response) {
        // network error
        errorMsg = "Error: Network Error";
      } else {
        errorMsg = err.response.data.message;
        errorStatus = err.response.status;
      }

      setAlert(errorMsg, "danger");

      dispatch({
        type: POST_ERROR,
        payload: { msg: errorMsg, status: errorStatus },
      });
    }
  };

  //   Get All Posts
  const getPosts = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get("http://localhost:8000/api/questions");
      console.log("getPosts: ", res.data);

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  // Get post
  const getPost = async (slug) => {
    dispatch({ type: SET_LOADING });

    try {
      const res = await axios.get(
        `http://localhost:8000/api/questions/${slug}`
      );
      console.log("getPost: ", res.data);

      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response);

      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });

      setAlert(err.response.data.message, "danger");
    }
  };

  // Add Post
  const addPost = async (formData) => {
    const token = localStorage.token ? localStorage.token : "";
    const config = { headers: { "Content-Type": "application/json" } };

    token
      ? (axios.defaults.headers.common["Authorization"] = "Bearer " + token)
      : delete axios.defaults.headers.common["Authorization"];

    try {
      dispatch({ type: SET_LOADING });

      const res = await axios.post(
        "http://localhost:8000/api/questions",
        formData,
        config
      );
      console.log(res);

      dispatch({
        type: ADD_POST,
        payload: res.data.result,
      });

      setAlert(res.data.message, "success");

      // getPosts();
    } catch (err) {
      console.log(err.response);
      setAlert(err.response.data.error, "danger");

      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  // Add Comment
  // const addComment = async (formData) => {
  //   const token = localStorage.token ? localStorage.token : "";
  //   const config = { headers: { "Content-Type": "application/json" } };

  //   token
  //     ? (axios.defaults.headers.common["Authorization"] = "Bearer " + token)
  //     : delete axios.defaults.headers.common["Authorization"];

  //   try {
  //     dispatch({ type: SET_LOADING });

  //     const res = await axios.post(
  //       "http://localhost:8000/api/comments",
  //       formData,
  //       config
  //     );
  //     console.log(res);

  //     dispatch({
  //       type: ADD_COMMENT,
  //       payload: res.data.result,
  //     });

  //     // setAlert(res.data.message, "success");

  //     // getPosts();
  //   } catch (err) {
  //     console.log(err.response);
  //     // setAlert(err.response.data.error, "danger");

  //     // dispatch({
  //     //   type: POST_ERROR,
  //     //   payload: { msg: err.response.statusText, status: err.response.status },
  //     // });
  //   }
  // }

  // Delete post
  const deletePost = async (id) => {
    const token = localStorage.token ? localStorage.token : "";

    token
      ? (axios.defaults.headers.common["Authorization"] = "Bearer " + token)
      : delete axios.defaults.headers.common["Authorization"];

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/questions/${id}`
      );
      console.log(res);

      dispatch({
        type: DELETE_POST,
        payload: id,
      });

      setAlert(res.data.message, "success");
    } catch (err) {
      let errorMsg = "";
      let errorStatus = "";
      if (!err.response) {
        errorMsg = "Error: Network Error";
      } else {
        errorMsg = err.response.message
          ? err.response.message
          : err.response.data.message;
        errorStatus = err.response.status;
      }

      setAlert(errorMsg, "danger");

      dispatch({
        type: POST_ERROR,
        payload: { msg: errorMsg, status: errorStatus },
      });
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        post: state.post,
        loading: state.loading,
        error: state.error,
        getTopPosts,
        getPosts,
        getPost,
        addPost,
        deletePost,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsState;
