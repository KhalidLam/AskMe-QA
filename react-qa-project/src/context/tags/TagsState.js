import React, { useReducer } from "react";
import axios from "axios";
import TagsContext from "./tagsContext";
import TagsReducer from "./tagsReducer";
import { GET_TAGS, GET_TAG_QUESTIONS, TAG_ERROR, SET_LOADING } from "../types";

const TagsState = (props) => {
  const initialState = {
    tags: [],
    tagQuestions: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(TagsReducer, initialState);

  const getTags = async () => {
    try {
      dispatch({ type: SET_LOADING });

      const res = await axios.get("http://localhost:8000/api/tags");

      // console.log(res.data);

      dispatch({
        type: GET_TAGS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TAG_ERROR,
        payload: { msg: err.response },
      });
    }
  };

  const getTagQuestions = async (tagname) => {
    try {
      dispatch({ type: SET_LOADING });

      const res = await axios.get(`http://localhost:8000/api/tags/${tagname}`);

      dispatch({
        type: GET_TAG_QUESTIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TAG_ERROR,
        payload: { msg: err.response },
      });
    }
  };

  return (
    <TagsContext.Provider
      value={{
        tags: state.tags,
        tagQuestions: state.tagQuestions,
        loading: state.loading,
        error: state.error,
        getTags,
        getTagQuestions,
      }}
    >
      {props.children}
    </TagsContext.Provider>
  );
};

export default TagsState;
