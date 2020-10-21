import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import authContext from "../../context/auth/authContext";

import "./Login.styles.scss";

// import { ReactComponent as Logo } from "../../assets/LogoGlyphMd.svg";
import LogoImage from "../../assets/logo.png";

const Login = () => {
  const { login, isAuthenticated, loading } = useContext(authContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-page'>
      <div className='register-content'>
        <div className='register-grid'>
          <div>
            <div className='icon-holder'>
              {/* <Logo className='icon' /> */}
              <img src={LogoImage} className='icon' alt='logo' />
            </div>
            <div className='form-container'>
              <form className='login-form' onSubmit={(e) => onSubmit(e)}>
                <div>
                  <label className='form-label s-label fc-black-600'>
                    Email
                  </label>
                  <input
                    className='form-input s-input'
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => onChange(e)}
                    id='email'
                  />
                </div>
                <div>
                  <label className='form-label s-label fc-black-600'>
                    Password
                  </label>
                  <input
                    className='form-input s-input'
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => onChange(e)}
                    id='password'
                  />
                </div>
                <div className='grid gs4 gsy fd-column js-auth-item '>
                  <button
                    className='s-btn s-btn__primary'
                    id='submit-button'
                    name='submit-button'
                  >
                    {!loading ? (
                      "Log in"
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

              <div className='fs-caption license fc-black-500'>
                By clicking “Log In”, you agree to our{" "}
                <Link
                  to='https://stackoverflow.com/legal/terms-of-service/public'
                  className='-link'
                >
                  terms of service
                </Link>
                ,{" "}
                <Link
                  to='https://stackoverflow.com/legal/privacy-policy'
                  name='privacy'
                  className='-link'
                >
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link
                  to='https://stackoverflow.com/legal/cookie-policy'
                  className='-link'
                >
                  cookie policy
                </Link>
                <input type='hidden' name='legalLinksShown' value='1' />
              </div>
            </div>
            <div className='redirects fc-black-500'>
              Don't have an account?{" "}
              <Link to='/register' name='login'>
                Sign up
              </Link>
              <div>
                Are you an employer?{" "}
                <Link
                  to='https://careers.stackoverflow.com/employer/login'
                  name='talent'
                >
                  Sign up on Talent{" "}
                  <svg
                    aria-hidden='true'
                    className='svg-icon va-text-bottom sm-d-none icon-share-sm'
                    width='14'
                    height='14'
                    viewBox='0 0 14 14'
                  >
                    <path d='M5 1H3a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V9h-2v2H3V3h2V1z' />
                    <path d='M7 1h6v6h-2V4.5L6.5 9 5 7.5 9.5 3H7V1z' />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
