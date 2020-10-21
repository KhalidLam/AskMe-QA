import React, { useContext, useEffect } from "react";
import JobRow from "./JobRow";
import SideBar from "../../components/SideBar/SideBar";
import Spinner from "../../components/spinner/Spinner";
import RightSideBar from "../../components/right-sideBar/right-sideBar";

import jobsContext from "../../context/jobs/jobsContext";

import "./Jobs.styles.scss";

const Jobs = () => {
  const { getJobs, jobs, loading } = useContext(jobsContext);

  useEffect(() => {
    getJobs();
    document.title = "Developer Jobs ( Remote ) - AskMe"
    // eslint-disable-next-line
  }, []);

  return (
    <div className='page'>
      <SideBar />

      <div id='content'>
        <div id='mainbar' className='jobs-page fc-black-800'>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h1 className='headline'>Jobs</h1>
              <p className='fs-body'>
                Developers first. You’ll never receive recruiter spam or see
                fake job listings on our site.
              </p>
              <div className='headline-count'>
                <span>590 jobs | Developer jobs</span>
              </div>
              <div className='user-browser'>
                <div className='grid-layout'>
                  {jobs.map((job) => (
                    <JobRow key={job.id} job={job} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Jobs;
