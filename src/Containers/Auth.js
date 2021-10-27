import React, { useState, useEffect } from 'react';
import queryString from 'querystring';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default (ComposedComponent) => {
  const RequireAuth = (props) => {
    const [isAuth, setAuth] = useState(false)
    useEffect(() => {
      let url = props.history.location
      if (localStorage.getItem('amplify_app_token')) {
        setAuth(true);
      } else if (url.search.includes('token')) {
        let query = queryString.parse(props.history.location.search)
        localStorage.setItem('amplify_app_token', query['?token'])
        let user = jwt.decode(query['?token'])
        if (user.near_connected) {
          if (localStorage.getItem('__redirect')) {
            window.location.href = localStorage.getItem('__redirect')
            localStorage.removeItem('__redirect')
          } else {
            window.location.href = '/'
          }
        } else {
          window.location.href = '/'
        }
      }
      else {
        let history = { ...props.history }
        props.history.push('/')
        setAuth(true);
        localStorage.setItem('__redirect', history.location.pathname)
      }
    }, []);
    if (isAuth)
      return (
        <ComposedComponent {...props} />
      )
    else {
      return <></>
    }
  }
  return withRouter(RequireAuth);
}