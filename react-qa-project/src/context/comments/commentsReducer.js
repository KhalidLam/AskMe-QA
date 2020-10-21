import {
  ADD_COMMENT,
  GET_COMMENTS,
  COMMENT_ERROR,
  DELETE_COMMENT,
  SET_LOADING
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return{
          ...state,
          comments: action.payload,
          commentloading: false
      };

    case ADD_COMMENT:
      return {
          ...state,
          comments: [ action.payload , ...state.comments],
          commentloading: false
      };

    case DELETE_COMMENT:
      return {
          ...state,
          comments: state.comments.filter(answer => answer.id !== action.payload),
          commentloading: false
      };

    case COMMENT_ERROR:
      return {
          ...state,
          error: action.payload,
          commentloading: false
      };

    case SET_LOADING:
      return {
        ...state,
        commentloading: true,
      };

    default:
      return state;
  }
};
