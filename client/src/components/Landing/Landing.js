import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import './Landing.css'
import Login from '../Login/Login'
import Register from '../Register/Register'

const Landing = () => {
    return (
        <div className="Landing">
            <div className="LandingBar">
                <div className="LandingLogoText">
                    {/* TODO: LOGO */}
                    <a href="/">bukket</a>
                </div>
                <div className="LandingBarLogin">
                    <Login />
                </div>
            </div>
            <div className="LandingContent">
                <div className="LandingContentLeft">
                    <div className="LandingContentLeftTitle">
                        <h1>Bukket</h1>
                        Create bucketlists in these Corona times.
                    </div>
                </div>
                <div className="LandingContentRight">
                    <Register />
                </div>
            </div>
            {/* This is the landing page<br />
            <Link to={ROUTES.LOGIN} >
                Login
            </Link><br />
            <Link to={ROUTES.REGISTER} >
                Register
            </Link> */}
        </div>
    )
}

export default Landing;