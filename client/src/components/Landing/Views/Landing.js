import React from 'react';
import './Landing.css'
import Login from '../../Login/Login'
import Register from '../../Register/Register'

const Landing = () => {
    return (
        <div className="Landing">
            <div className="LandingBar">
                <div className="LandingLogoText">
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
                        <br />
                        <br />
                        Insert metatext here
                    </div>
                </div>
                <div className="LandingContentRight">
                    <Register />
                </div>
            </div>
        </div>
    )
}

export default Landing;