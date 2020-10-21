import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SideBar from "../../components/SideBar/SideBar";
import PostItem from "../../components/PostItem/PostItem";
import RightSideBar from "../../components/right-sideBar/right-sideBar";

import "./QuestionsPage.styles.scss";

const QuestionsPage = ({ getPosts, posts, loading }) => {
  // useEffect(() => {
  //     getPosts();
  // }, [ getPosts ]);

  const defaultPosts = [
    {
      id: "1",
      title: "How do I render screens according to state variables?",
      body:
        "Our app uses React Native 0.63.2 and React Navigation v5. We are using functional components with hooks only, no classes. I need to find a way to render the following screens according to the following pieces of state, so: if hasSelectedLanguage AND hasCompletedIntro are both true, they should go to the HomeScreen. hasSelectedLanguage is true but hasCompletedIntro is false, they should go to the WelcomeScreen. hasSelectedLanguage is false, they should go to the ChooseYourLanguageScreen. As you can see in the code snippet, I have already found a way to render screens according to the boolean state of hasCompletedIntro, but React Navigation 5 throws errors when I try to chain ternary statements. I'm stuck. I would love to know how to render screens to account for the bullet points above while also retaining the navigation associated with the hasCompletedIntro ternary which is already in the code",
      tagname: "javascript",
      username: "dereknahman",
      user_id: "dereknahman",
      answer_count: "0",
      comment_count: "0",
      created_at: "2020-08-13",
    },
    {
      id: "2",
      title: "How do I render screens according to state variables?",
      body:
        "Our app uses React Native 0.63.2 and React Navigation v5. We are using functional components with hooks only, no classes. I need to find a way to render the following screens according to the following pieces of state, so: if hasSelectedLanguage AND hasCompletedIntro are both true, they should go to the HomeScreen. hasSelectedLanguage is true but hasCompletedIntro is false, they should go to the WelcomeScreen. hasSelectedLanguage is false, they should go to the ChooseYourLanguageScreen. As you can see in the code snippet, I have already found a way to render screens according to the boolean state of hasCompletedIntro, but React Navigation 5 throws errors when I try to chain ternary statements. I'm stuck. I would love to know how to render screens to account for the bullet points above while also retaining the navigation associated with the hasCompletedIntro ternary which is already in the code",
      tagname: "javascript",
      username: "dereknahman",
      user_id: "dereknahman",
      answer_count: "0",
      comment_count: "0",
      created_at: "2020-08-19",
    },
    {
      id: "3",
      title: "How do I render screens according to state variables?",
      body:
        "Our app uses React Native 0.63.2 and React Navigation v5. We are using functional components with hooks only, no classes. I need to find a way to render the following screens according to the following pieces of state, so: if hasSelectedLanguage AND hasCompletedIntro are both true, they should go to the HomeScreen. hasSelectedLanguage is true but hasCompletedIntro is false, they should go to the WelcomeScreen. hasSelectedLanguage is false, they should go to the ChooseYourLanguageScreen. As you can see in the code snippet, I have already found a way to render screens according to the boolean state of hasCompletedIntro, but React Navigation 5 throws errors when I try to chain ternary statements. I'm stuck. I would love to know how to render screens to account for the bullet points above while also retaining the navigation associated with the hasCompletedIntro ternary which is already in the code",
      tagname: "javascript",
      username: "dereknahman",
      user_id: "dereknahman",
      answer_count: "0",
      comment_count: "0",
      created_at: "2020-08-19",
    },
  ];

  posts = posts ? posts : defaultPosts;

  return (
    <div className='page'>
      <SideBar />
      <div id='content'>
        <div id='mainbar' className='questions-page fc-black-800'>
          <div className='questions-grid'>
            <h3 className='questions-headline'>All Questions</h3>
            <div className='questions-btn'>
              <Link to='/add/question'>
                <button className='s-btn s-btn__primary'>Ask Question</button>
              </Link>
            </div>
          </div>
          <div className='questions-tabs'>
            <span>19,204,360 questions</span>
          </div>
          <div className='questions'>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

QuestionsPage.propTypes = {
  post: PropTypes.object.isRequired,
};

export default QuestionsPage;
