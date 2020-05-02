import React, { Component } from 'react';

import RegisterView from './Views/RegisterView'

const initialState = {
    email: '',
    username: '',
    passwordOne: '',
    passwordTwo: '',
    error: '',
    success: false,
    fetching: false,
}

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const {username, email, passwordOne} = this.state;

        this.setState({fetching:true})
        
        fetch("/api/auth/register", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password: passwordOne})
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({fetching: false})

            if (json.error) {
                this.setState({error: json.error})
            } else {
                this.setState({...initialState}, () => {
                    this.setState({success: true})
                })
            }
        })
    }

    render() {
        const {username, email, passwordOne, passwordTwo, error, success, fetching} = this.state;
        const isInvalid = username === '' || email === '' || passwordOne === '' || passwordTwo === '' || passwordOne !== passwordTwo;
        
        return (
            <RegisterView
                error={error}
                success={success}
                email={email}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                username={username}
                passwordOne={passwordOne}
                passwordTwo={passwordTwo}
                isInvalid={isInvalid}
                fetching={fetching}
            />
        )
    }
}

export default Register;