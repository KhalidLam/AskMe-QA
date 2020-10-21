import React, { useReducer } from "react";
import axios from "axios";
import JobsContext from "./jobsContext";
import JobsReducer from "./jobsReducer";
// import alertContext from "../alert/alertContext";
import { GET_JOBS, JOB_ERROR, SET_LOADING } from "../types";

const JobsState = (props) => {
  // const { setAlert } = useContext(alertContext);

  const initialState = {
    jobs: [],
    job: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(JobsReducer, initialState);

  //   Get All Jobs
  const getJobs = async () => {
    dispatch({ type: SET_LOADING });

    try {
      const getApiUrl = `https://cors-anywhere.herokuapp.com/https://remotive.io/api/remote-jobs?limit=10`;

      const res = await axios.get(getApiUrl);
      console.log("getJobs: ", res);

      dispatch({
        type: GET_JOBS,
        payload: res.data.jobs,
      });
    } catch (err) {
      console.log(err);

      dispatch({
        type: JOB_ERROR,
        payload: { msg: err.response.statusText },
      });
    }
  };

  // Get Job details
  // const getJob = async () => {

  //   try {
  //     const res = await axios.get('')
  //     console.log(res)

  //     dispatch({
  //       type: GET_JOB,
  //       payload: {},
  //     })

  //   } catch (err) {

  //   }
  // }

  return (
    <JobsContext.Provider
      value={{
        jobs: state.jobs,
        job: state.job,
        loading: state.loading,
        error: state.error,
        getJobs,
      }}
    >
      {props.children}
    </JobsContext.Provider>
  );
};

export default JobsState;
