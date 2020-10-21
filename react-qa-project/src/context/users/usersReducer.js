import { GET_USERS, GET_USER, USER_ERROR, SET_LOADING } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case GET_USER:
    return {
        ...state,
        user: action.payload,
        loading: false,
      }

    case USER_ERROR:
      break;

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
