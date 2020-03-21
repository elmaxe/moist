import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as ROUTES from '../../routes';

const Landing = () => {
    return (
        <div>
            This is the landing page<br />
            <Link to={ROUTES.LOGIN} >
                Login
            </Link><br />
            <Link to={ROUTES.REGISTER} >
                Register
            </Link>
        </div>
    )
}

export default Landing;