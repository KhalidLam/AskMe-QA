import React, { useEffect, useContext, Fragment } from "react";
import tagsContext from "../../context/tags/tagsContext";

import Spinner from "../../components/spinner/Spinner";
import SideBar from "../../components/SideBar/SideBar";
import RightSideBar from "../../components/right-sideBar/right-sideBar";
import TagPanel from "./TagPanel";

import "./TagsPage.styles.scss";

const TagsPage = () => {
  const { tags, loading, getTags } = useContext(tagsContext);

  useEffect(() => {
    getTags();
    document.title = "Tags - AskMe"
    // eslint-disable-next-line
  }, []);

  return (
    <div className='page'>
      <SideBar />
      <div id='content'>
        <div id='mainbar' className='tags-page fc-black-800'>
          {loading || tags.length === 0 ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1 className='headline'>Tags</h1>
              <p className='fs-body'>
                A tag is a keyword or label that categorizes your question with
                other, similar questions. Using the right tags makes it easier
                for others to find and answer your question.
              </p>
              <div className='headline-count'>
                <span>1,025 tags</span>
              </div>
              <div className='user-browser'>
                <div className='grid-layout'>
                  {tags.map((tag) => (
                    <TagPanel key={tag.tagname} tag={tag} />
                  ))}
                </div>
              </div>
            </Fragment>
          )}
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default TagsPage;
