import React from 'react';
import './Landing.css'
import Login from '../../Login/Login'
import Register from '../../Register/Register'
import landingman from '../../../images/landing-man.png'

const Landing = ({actions}) => {
    return (
        <div className="Landing">
            <div className="LandingBar">
                <div className="LandingLogoText">
                    <a href="/">bukket</a>
                </div>
                <div className="LandingBarLogin">
                    <Login actions={actions} />
                </div>
            </div>
            <div className="LandingContent">
                <div className="LandingContentLeft">
                    <div className="LandingContentLeftTitle">
                        <h1>bukket - the solution to boredom in these Corona times</h1>
                        {/* Bukket - the solution to boredom in these Corona times. */}
                        <br />
                        {/* <br /> */}
                        bukket is website which provides you which dynamically suggests activities for your bukketlists - perfect for when you don't know what to do. Share your life goals with others, and view your friends life goals!
                        <div className="testelitest">
                            <img src={landingman} style={{position: "absolute", bottom: "0px"}}/>
                        </div>
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