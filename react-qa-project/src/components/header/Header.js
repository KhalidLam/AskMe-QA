import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import authContext from "../../context/auth/authContext";

import { ReactComponent as Search } from "../../assets/Search.svg";
import DefaultLogo from "../../assets/deflogo.png";

import "./header.styles.scss";

const Header = () => {
  const { isAuthenticated, loading, logout } = useContext(authContext);

  const authLoading = (
    <button className='s-btn s-btn__filled' type='button' disabled>
      <span
        className='spinner-border spinner-border-sm'
        role='status'
        aria-hidden='true'
      ></span>
      <span className='sr-only'>Loading...</span>
    </button>
  );

  const authLinks = (
    <div className='btns'>
      <Link onClick={logout} to='/login'>
        <button type='button' className='s-btn s-btn__filled'>
          Log out
        </button>
      </Link>
    </div>
  );

  const authTabs = (
    <div className='s-navigation'>
      <Link to='/' className='s-navigation--item is-selected'>
        Products
      </Link>
    </div>
  );

  const guestTabs = (
    <div className='s-navigation'>
      <Link to='/' className='s-navigation--item is-selected'>
        Products
      </Link>
      <Link to='/' className='s-navigation--item not-selected'>
        Customers
      </Link>
      <Link to='/' className='s-navigation--item not-selected'>
        About
      </Link>
    </div>
  );

  const guestLinks = (
    <div className='btns'>
      <Link to='/login'>
        <button type='button' className='s-btn s-btn__primary'>
          Log in
        </button>
      </Link>
      <Link to='/register'>
        <button type='button' className='s-btn s-btn__filled'>
          Sign up
        </button>
      </Link>
    </div>
  );

  return (
    <nav className='navbar fixed-top navbar-expand-lg navbar-light bs-md'>
      <Link className='navbar-brand' to='/'>
        <img
          src={DefaultLogo}
          alt=''
          style={{ width: "120px", height: "auto" }}
        />
      </Link>
      {!loading && (
        <Fragment>{isAuthenticated ? authTabs : guestTabs}</Fragment>
      )}
      <form
        id='search'
        role='search'
        method='get'
        className='grid--cell fl-grow1 searchbar px12 js-searchbar '
        autoComplete='off'
      >
        <div className='ps-relative'>
          <input
            name='q'
            type='text'
            placeholder='Search&#x2026;'
            maxLength='240'
            className='s-input s-input__search js-search-field '
          />
          <Search />
        </div>
      </form>
      {loading ? (
        authLoading
      ) : (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Header;
