import React, { useReducer, useContext } from "react";
import axios from "axios";
import CommentsContext from "./commentsContext";
import CommentsReducer from "./commentsReducer";
import alertContext from "../alert/alertContext";
import {
  ADD_COMMENT,
  GET_COMMENTS,
  COMMENT_ERROR,
  DELETE_COMMENT,
  SET_LOADING,
} from "../types";

const CommentsState = (props) => {
  const { setAlert } = useContext(alertContext);

  const initialState = {
    comments: [],
    commentloading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(CommentsReducer, initialState);

  const getComments = async (slug) => {

    try {
      dispatch({ type: SET_LOADING });

      const res = await axios.get(`http://localhost:8000/api/comments/${slug}`);

      console.log("getComments: ", res.data);

      dispatch({
        type: GET_COMMENTS,
        payload: res.data,
      });

    } catch (err) {
      console.log(err);

      dispatch({
        type: COMMENT_ERROR,
        payload: { msg: err.response },
      });
    }
  };

  // Add COMMENT
  const addComment = async (slug, formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: SET_LOADING });

      const res = await axios.post(
        `http://localhost:8000/api/comments`,
        formData,
        config
      );

      console.log('AddComment: ', res.data);

      dispatch({
        type: ADD_COMMENT,
        payload: res.data.result,
      });

      setAlert(res.data.message, 'success');

      getComments(slug);

    } catch (err) {
      console.log(err);
      setAlert(err.response.data.message, "danger");

      dispatch({
        type: COMMENT_ERROR,
        payload: { msg: err.response },
      });
    }
  };

 // Delete Comment
 const deleteComment = async CommentId => {
    try {
        dispatch({ type: SET_LOADING });
        const res = await axios.delete(`http://localhost:8000/api/comments/${CommentId}`);

        console.log("DeleteComment: ", res);

        dispatch({
          type: DELETE_COMMENT,
          payload: CommentId
        });

        setAlert(res.data.message, 'success');
    } catch (err) {
        console.log(err);
        setAlert(err.response.data.message, 'danger');

        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response }
        });
    }
};

  return (
    <CommentsContext.Provider
      value={{
        comments: state.comments,
        commentloading: state.commentloading,
        error: state.error,
        getComments,
        addComment,
        deleteComment,
      }}
    >
      {props.children}
    </CommentsContext.Provider>
  );
};

export default CommentsState;


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
  // };