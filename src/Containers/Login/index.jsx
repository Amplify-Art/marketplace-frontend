import React, { useEffect } from 'react';
import Twitter from './twitter.jsx';
import { API_ENDPOINT_URL } from '../../Constants/default'
import { withRouter } from 'react-router-dom';
import './login.scss';

const Login = ({ history, onConnect }) => {
  useEffect(() => {
    if (localStorage.getItem('amplify_app_token')) {
      history.push('/')
    }
  }, [])
  return <div className="login">
    <p href="#" onClick={onConnect}><Twitter /><span>Login with NEAR</span></p>
  </div >
}
export default withRouter(Login)
