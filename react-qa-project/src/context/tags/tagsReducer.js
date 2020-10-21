import { GET_TAGS, GET_TAG_QUESTIONS, TAG_ERROR, SET_LOADING } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload,
        loading: false,
      };
    case GET_TAG_QUESTIONS:
      return {
        ...state,
        tagQuestions: action.payload,
        loading: false,
      };
    case TAG_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
