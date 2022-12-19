import React, { useEffect } from 'react';
import { API_ENDPOINT_URL } from '../../Constants/default'
import { withRouter } from 'react-router-dom';
import NearLogo from '../../assets/images/near_icon.svg'
import './login.scss';

const Login = ({ history, onConnect }) => {
  useEffect(() => {
    if (localStorage.getItem('amplify_app_token')) {
      history.push('/')
    }
  }, [])
  return <div className="login">
    <p href="#" onClick={onConnect}><img src={NearLogo} /><span>Login</span></p>
  </div >
}
export default withRouter(Login)
