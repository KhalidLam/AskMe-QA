import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./TagPanel.styles.scss";

const TagPanel = ({ tag }) => {
  const { tagname, created_at, posts_count } = tag;
  return (
    <Link className='link-tag-card' to={`/tags/${tagname}`}>
      <div className='tag-card'>
        <div className='grid'>
          <div className='grid-cell'>
            <Link className='s-tag' to={`/tags/${tagname}`}>
              {tagname}
            </Link>
          </div>
        </div>
        <div className='caption'>
          <div>{posts_count} questions</div>
          <div>added {moment(created_at).fromNow(true)} ago</div>
        </div>
      </div>
    </Link>
  );
};

TagPanel.propTypes = {
  tag: PropTypes.object.isRequired,
};

export default TagPanel;
