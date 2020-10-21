import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import JobImg from "../../assets/job-img.svg";
import "./Job.styles.scss";

const JobRow = ({ job }) => {
  const {
    url,
    title,
    company_name,
    candidate_required_location,
    job_type,
    category,
    tags,
    // description,
  } = job;

  return (
    <div className='job-container s-card'>
      <div className='job-img'>
        <img src={JobImg} alt='job logo' className='img' />
      </div>

      <div className='job-item'>
        <h2 className='job-title'>
          <a href={url} target='_blank' rel='noopener noreferrer'>
            {title}
          </a>
        </h2>
        <h3 className='job-company'>
          <span>{company_name}</span>
        </h3>

        <div className='job-content'>
          <span className='job-type'>
            Job type: {job_type.split("_").join(" ")}
          </span>

          <span className='job-from'>
            Hiring from: {candidate_required_location}
          </span>

          <span className='job-cat'> Category: {category} </span>
        </div>

        <div className='job-list'>
          {tags.length > 0 &&
            tags.map((tagname, index) => (
              <Link className='s-tag' to={`/tags/${tagname}`} key={index}>
                {tagname}
              </Link>
            ))}
        </div>

        {/* <div className="job-desc" dangerouslySetInnerHTML={{ __html: description }} /> */}
      </div>
    </div>
  );
};

JobRow.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobRow;
