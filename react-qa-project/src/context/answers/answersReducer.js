import {
    GET_ANSWERS,
    ANSWER_ERROR,
    ADD_ANSWER,
    DELETE_ANSWER,
    SET_LOADING,
} from "../types";

export default (state, action) => {
    switch (action.type){
        case GET_ANSWERS:
            return{
                ...state,
                answers: action.payload,
                loading: false
            };

        case ADD_ANSWER:
            return {
                ...state,
                answers: [  ...state.answers, action.payload ],
                loading: false
            };

        case DELETE_ANSWER:
            return {
                ...state,
                answers: state.answers.filter(answer => answer.id !== action.payload),
                loading: false
            };

        case ANSWER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
}