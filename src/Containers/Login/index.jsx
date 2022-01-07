import React, { useEffect } from 'react';
import Twitter from './twitter.jsx';
import { API_ENDPOINT_URL } from '../../Constants/default'
import { withRouter } from 'react-router-dom';
import './login.scss';

const Login = ({ history }) => {
  useEffect(() => {
    if (localStorage.getItem('amplify_app_token')) {
      history.push('/')
    }
  }, [])
  return <div className="login">
    <a href={`${API_ENDPOINT_URL}/auth/twitter`}><Twitter /><span>Login with Near</span></a>
  </div >
}
export default withRouter(Login)
