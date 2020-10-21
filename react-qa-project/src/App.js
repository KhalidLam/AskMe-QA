import React from "react";
import { Switch, Route } from "react-router-dom";

import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import PostsState from "./context/posts/PostsState";
import TagsState from "./context/tags/TagsState";
import AnswersState from "./context/answers/AnswersState";
import CommentState from "./context/comments/CommentsState";
import UserState from "./context/users/UsersState";

import HomePage from "./pages/HomePage/HomePage";
import QuestionsPage from "./pages/QuestionsPage/QuestionsPage";
import TagsPage from "./pages/TagsPage/TagsPage";
import TagPage from "./pages/TagPage/TagPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import PostForm from "./pages/PostForm/PostForm";
import Post from "./pages/Post/Post";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserPage from "./pages/UserPage/UserPage";
import Jobs from "./pages/jobs/Jobs";

import Header from "./components/header/Header";
import Alert from "./components/alert/alert";
import JobsState from "./context/jobs/JobsState";

function App() {
  return (
    <AlertState>
      <AuthState>
        <PostsState>
          <TagsState>
            <AnswersState>
              <JobsState>
                <CommentState>
                  <UserState>
                    <div className='App'>
                      <Header />
                      <Alert />
                      <Switch>
                        <Route
                          exact
                          path='/questions'
                          component={QuestionsPage}
                        />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route
                          exact
                          path='/add/question'
                          component={PostForm}
                        />
                        <Route exact path='/tags' component={TagsPage} />
                        <Route exact path='/users' component={UsersPage} />
                        <Route exact path='/questions/:slug' component={Post} />
                        <Route exact path='/users/:id' component={UserPage} />
                        <Route
                          exact
                          path='/tags/:tagname'
                          component={TagPage}
                        />
                        <Route exact path='/jobs' component={Jobs} />
                        <Route path='/' component={HomePage} />
                      </Switch>
                    </div>
                  </UserState>
                </CommentState>
              </JobsState>
            </AnswersState>
          </TagsState>
        </PostsState>
      </AuthState>
    </AlertState>
  );
}

export default App;
