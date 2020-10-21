import React, { Fragment, useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CKEditor from "ckeditor4-react";

import postsContext from "../../context/posts/postsContext";

import "./PostForm.styles.scss";
import authContext from "../../context/auth/authContext";

const PostForm = () => {
  let history = useHistory();
  const { isAuthenticated } = useContext(authContext);
  const { addPost, loading, error } = useContext(postsContext);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: "",
  });
  const { title, body, tags } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    addPost({ title, body, tags });
    setFormData({
      title: "",
      body: "",
      tags: "",
    });

    // Redirect after post is submited successfuly
    if (!error) setTimeout(() => history.push("/"), 1000);
  };

  // Test CKeditor
  // const [data, setData] = useState("");
  const onEditorChange = (e) => {
    console.log(e.editor.getData());
    setFormData({ ...formData, body: e.editor.getData() });
  };

  // Redirect if user is not log in
  if (!isAuthenticated) return <Redirect to='/login' />;

  return (
    <Fragment>
      <div className='post-form-container'>
        <div className='post-form-content'>
          <div className='post-form-header'>
            <div className='post-form-headline fc-black-800'>
              Ask a public question
            </div>
          </div>
          <div className='post-form-section'>
            {/* Form */}
            <div className='postform' style={{ width: "100%" }}>
              <form onSubmit={onSubmit}>
                <div className='question-form p16 s-card'>
                  <div className='question-layout'>
                    <div className='title-grid'>
                      <label className='form-label s-label'>
                        Title
                        <p className='title-desc fw-normal fs-caption'>
                          Be specific and imagine you’re asking a question to
                          another person
                        </p>
                      </label>
                      <input
                        className='title-input s-input'
                        type='text'
                        name='title'
                        value={title}
                        onChange={(e) => handleChange(e)}
                        id='title'
                        placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                      />
                    </div>
                    <div className='body-grid'>
                      <label className='form-label s-label fc-black-800'>
                        Body
                        <p className='body-desc fw-normal fs-caption fc-black-800'>
                          Include all the information someone would need to
                          answer your question
                        </p>
                      </label>
                      {/* <textarea
                        className='s-textarea'
                        name='body'
                        cols='30'
                        rows='12'
                        value={body}
                        onChange={handleChange}
                        placeholder='Enter body with minimum 30 characters'
                        id='body'
                      ></textarea> */}

                      <CKEditor
                        data={body}
                        config={{
                          extraPlugins: "codesnippet",
                          codeSnippet_theme: "monokai_sublime",
                          height: 356,
                        }}
                        type='classic'
                        onChange={onEditorChange}
                      />
                    </div>
                    <div className='tag-grid'>
                      <label className='form-label s-label'>
                        Tag Name
                        <p className='tag-desc fw-normal fs-caption'>
                          Add up to 5 tags to describe what your question is
                          about
                        </p>
                      </label>
                      {/* <input type="text" name="tags" class="form-control"/> */}
                      <input
                        className='tag-input s-input'
                        type='text'
                        name='tags'
                        value={tags}
                        onChange={(e) => handleChange(e)}
                        id='tags'
                        placeholder='e.g. (ajax,django,string)'
                      />
                    </div>
                  </div>
                </div>
                <div className='post-button mt32'>
                  <button
                    className='s-btn s-btn__primary'
                    id='submit-button'
                    name='submit-button'
                  >
                    {!loading ? (
                      "Post your question"
                    ) : (
                      <span
                        className='spinner-border spinner-border-sm'
                        role='status'
                        aria-hidden='true'
                      ></span>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Aside */}
            <aside>
              <div className='right-panel'>
                <div className='widget'>
                  <div className='s-sidebarwidget--header'>
                    Step 1: Draft your question
                  </div>
                  <div className='widget-content fc-black-800'>
                    <div className='summary'>
                      <p className='sec1'>
                        The community is here to help you with specific coding,
                        algorithm, or language problems.
                      </p>
                      <p className='sec2'>
                        Avoid asking opinion-based questions.
                      </p>
                    </div>
                    <ol className='step-section'>
                      <li className='step'>
                        <button>
                          <div className='step-cell'>
                            <div>
                              <img
                                src='https://cdn.sstatic.net/Img/list-1.svg?v=e8dd475ba207'
                                width='16'
                                height='16'
                                alt='1.'
                              />
                            </div>
                            <span>Summarize the problem</span>
                          </div>
                        </button>
                        <div className='inst'>
                          <div className='inst-content'>
                            <ul>
                              <li>
                                <p>Include details about your goal</p>
                              </li>
                              <li>
                                <p>Describe expected and actual results</p>
                              </li>
                              <li>
                                <p className='except'>
                                  Include any error messages
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li className='step'>
                        <button>
                          <div className='step-cell'>
                            <div>
                              <img
                                src='https://cdn.sstatic.net/Img/list-2.svg?v=9382fc2c3631'
                                width='16'
                                height='16'
                                alt='2.'
                              />
                            </div>
                            <span>Summarize the problem</span>
                          </div>
                        </button>
                        <div className='inst'>
                          <div className='inst-content'>
                            <p className='step2'>
                              Show what you’ve tried and tell us what you found
                              (on this site or elsewhere) and why it didn’t meet
                              your needs. You can get better answers when you
                              provide research.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li
                        style={{
                          borderBottomRightRadius: "3px",
                          borderBottomLeftRadius: "3px",
                        }}
                        className='step except-step'
                      >
                        <button>
                          <div className='step-cell'>
                            <div>
                              <img
                                src='https://cdn.sstatic.net/Img/list-3.svg?v=323a95564232'
                                width='16'
                                height='16'
                                alt='3.'
                              />
                            </div>
                            <span>Summarize the problem</span>
                          </div>
                        </button>
                        <div className='inst'>
                          <div className='inst-content'>
                            <p className='step3'>
                              When appropriate, share the minimum amount of code
                              others need to reproduce your problem (also called
                              a minimum, reproducible example)
                            </p>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostForm;
