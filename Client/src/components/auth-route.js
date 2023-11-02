import React from 'react';
import { Route } from 'react-router-dom';
// import NotFound from '../pages/not-found';

const AuthRoute = ({ component, loggedIn, isValidRole, path, ...props }) => {
    if (!loggedIn || !isValidRole) return 'Not found'
    return (
        <Route path={path} component={component} {...props} />
    )
}

export default AuthRoute
