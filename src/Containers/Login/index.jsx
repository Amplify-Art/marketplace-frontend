import React from 'react';
import Twitter from './twitter.jsx';
import { API_ENDPOINT_URL } from '../../Constants/default'
import { withRouter } from 'react-router-dom';
import './login.scss';

const Login = () => {
  return <div className="login">
    <a href={`${API_ENDPOINT_URL}/auth/twitter`}><Twitter /><span>Login with Twitter</span></a>
  </div >
}
export default withRouter(Login)
