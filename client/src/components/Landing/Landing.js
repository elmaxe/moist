import React from 'react';
import { Redirect } from 'react-router';
import * as ROUTES from '../../routes';

const Landing = () => {
    return (
        <Redirect to={ROUTES.LOGIN} />
    )
}

export default Landing;