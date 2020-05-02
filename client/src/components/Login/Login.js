import React from 'react';
import LoginView from './Views/LoginView'

import * as ROUTES from '../../routes';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import setUser from '../../actions/user'


const initialState = {
    email: '',
    password: '',
    error: '',
    loggingIn: false,
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.setState({error: ''})
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;

        //TODO: SET STATE FETCHING
        //CLEAR INPUT FIELDS
        this.setState({loggingIn: true})
        fetch(ROUTES.API_LOGIN, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then(json => {
            
            this.setState({loggingIn: false})
            
            if (json.error) {
                this.setState({error: json.error})
            } else {
                this.setState({...initialState},
                    //Otherwise we get "can't perform state change on unmounted component" since when we set the user it will unmount the component.
                    //Callback to do it after the state is set
                () => {
                    this.props.actions.setUser(true, true, json.id, json.email, json.username, json.profilePicture, json.regDate)
                })
            }
        })
    }

    render() {

        const {email, password, error, loggingIn} = this.state;

        const isInvalid = email === '' || password === '';

        return (
            <LoginView
                email={email}
                password={password}
                error={error}
                loggingIn={loggingIn}
                isInvalid={isInvalid}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default Login