import React from 'react';

import * as ROUTES from '../../routes';
import { Link } from 'react-router-dom';

import './NotFound.css'

const NotFound = () => {
    return (
        <div className="NotFound">
            <h1>404 Not Found</h1>
            The page you are looking for doesn't exist, or something just went wrong ):
            <br />
            <br />
            <Link to={ROUTES.LANDING}>Back to safety</Link>
        </div>
    )
}

export default NotFound;