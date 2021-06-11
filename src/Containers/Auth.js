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
                    window.location.href = '/'
                } else {
                    window.location.href = '/auth/sign-in'
                }
            }
            else {
                props.history.push('/auth/login')
                setAuth(true);
            }
        }, []);
        if (isAuth)
            return (
                <ComposedComponent {...props} />
            )
        else {
            return <React.Fragment></React.Fragment>
        }
    }
    return withRouter(RequireAuth);
}