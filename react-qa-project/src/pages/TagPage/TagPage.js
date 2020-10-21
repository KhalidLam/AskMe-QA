import React, { Fragment, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import tagsContext from "../../context/tags/tagsContext";

import Spinner from "../../components/spinner/Spinner";
import SideBar from "../../components/SideBar/SideBar";
import PostItem from "../../components/PostItem/PostItem";
import RightSideBar from "../../components/right-sideBar/right-sideBar";

const TagPage = ({ match }) => {
  const { tagQuestions, loading, getTagQuestions } = useContext(tagsContext);

  useEffect(() => {
    getTagQuestions(match.params.tagname);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='page'>
      <SideBar />
      <div id='content'>
        <div id='mainbar' className='questions-page fc-black-800'>
          {loading || tagQuestions.length === 0 ? (
            <Spinner />
          ) : (
            <Fragment>
              <div className='questions-grid'>
                <h3 className='questions-headline'>
                  Questions tagged [{match.params.tagname}]
                </h3>
                <div className='questions-btn'>
                  <Link to='/add/question'>
                    <button className='s-btn s-btn__primary'>
                      Ask Question
                    </button>
                  </Link>
                </div>
              </div>
              <div className='questions-tabs'>
                <span>19,204,360 questions</span>
              </div>
              <div className='questions'>
                {tagQuestions.length === 0 ? (
                  <h4 style={{ margin: "30px 30px" }}>
                    There are no questions from this tag
                  </h4>
                ) : (
                  tagQuestions.map((post) => (
                    <PostItem key={post.id} post={post} />
                  ))
                )}
              </div>
            </Fragment>
          )}
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default TagPage;
