import React, { useReducer, useContext } from "react";
import axios from "axios";
import AnswersContext from "./answersContext";
import AnswersReducer from "./answersReducer";
import alertContext from "../alert/alertContext";

import {
    GET_ANSWERS,
    ANSWER_ERROR,
    ADD_ANSWER,
    DELETE_ANSWER,
    SET_LOADING,
} from "../types";

const AnswersState = (props) => {
  const { setAlert } = useContext(alertContext);

  const initialState = {
    answers: [],
    loading: true,
    error: {}
  };

  const [state, dispatch] = useReducer(AnswersReducer, initialState);

    // Get Answers
    const getAnswers = async slug =>  {
        dispatch({ type: SET_LOADING });

        try {
            const res = await axios.get(`http://localhost:8000/api/answers/${slug}`);
            console.log("getAnswers: ", res.data);

            dispatch({
                type: GET_ANSWERS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: ANSWER_ERROR,
                payload: { msg: err.response }
            });
        }
    };

    // Add Answer
    const addAnswer = async (slug, formData)  => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post(`http://localhost:8000/api/answers/${slug}`, formData, config);
            console.log("addAnswer: ", res);

            dispatch({
                type: ADD_ANSWER,
                payload: res.data.result
            });

            setAlert(res.data.message, 'success');

            // getAnswers(postId);
        } catch (err) {
            setAlert(err.response.data.message, 'danger');

            console.log(err.response);
            dispatch({
                type: ANSWER_ERROR,
                payload: { msg: err.response }
            });
        }
    };

    // Delete Answer
    const deleteAnswer = async AnswerId  => {
        try {

            const res = await axios.delete(`http://localhost:8000/api/answers/${AnswerId}`);

            console.log("deleteAnswer: ", res);

            dispatch({
                type: DELETE_ANSWER,
                payload: AnswerId
            });

            setAlert(res.data.message, 'success');
        } catch (err) {
            setAlert(err.response.data.message, 'danger');

            dispatch({
                type: ANSWER_ERROR,
                payload: { msg: err.response }
            });
        }
    };

  return (
    <AnswersContext.Provider
      value={{
        answers: state.answers,
        loading: state.loading,
        error: state.error,
        getAnswers,
        addAnswer,
        deleteAnswer
      }}
    >
      {props.children}
    </AnswersContext.Provider>
  );
};

export default AnswersState;


