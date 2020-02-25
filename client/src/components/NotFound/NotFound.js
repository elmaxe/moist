import React from 'react';

import * as ROUTES from '../../routes';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>404 Not Found</h1>
            <Link to={ROUTES.LANDING}>Home</Link>
        </div>
    )
}

export default NotFound;