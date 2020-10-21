import React, { Fragment, useEffect, useContext } from "react";
// import PropTypes from 'prop-types';

import SideBar from "../../components/SideBar/SideBar";
import RightSideBar from "../../components/right-sideBar/right-sideBar";
import Spinner from "../../components/spinner/Spinner";

import "./UsersPage.styles.scss";
import UsersContext from "../../context/users/usersContext";
import UserPanel from "./UserPanel";

// ({ getUsers, user: { users, loading } })
const UsersPage = () => {
  const { users, loading, getUsers } = useContext(UsersContext);

  useEffect(() => {
    getUsers();
    document.title = "Users - AskMe"
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='page'>
        <SideBar />
        <div id='content'>
          <div id='mainbar' className='users-page fc-black-800'>
            {loading || !users.length ? (
              <Spinner />
            ) : (
              <Fragment>
                <h1 className='headline'>Users</h1>
                <div className='headline-count'>
                  <span>1,025 users</span>
                </div>
                <div className='user-browser'>
                  <div className='grid-layout'>
                    {users.map((user) => (
                      <UserPanel key={user.id} user={user} />
                    ))}
                  </div>
                </div>
              </Fragment>
            )}
          </div>
          <RightSideBar />
        </div>
      </div>
    </Fragment>
  );
};

// UsersPage.propTypes = {
//   getUsers: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// };

export default UsersPage;


// const allUsers = [
//   {
//     id: 1,
//     username: "Gordon Linoff",
//     created_at: "2020-08-26T12:37:35.000Z",
//     posts_count: 717,
//     tags_count: "sql, sql-server, mysql",
//   },
//   {
//     id: 2,
//     username: "BEN_YO",
//     created_at: "2020-08-26T12:37:35.000Z",
//     posts_count: 516,
//     tags_count: "r, dplyr, dataframe",
//   },
//   {
//     id: 3,
//     username: "Ronak Shah",
//     created_at: "2020-08-26T12:37:35.000Z",
//     posts_count: 251,
//     tags_count: "pandas, python, dataframe",
//   },

// ];

// users = allUsers.concat(users);
