import React, { useState, Component } from 'react';

const initialState = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
}

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {

    }

    handleSubmit(e) {

    }

    render() {
        console.log(this.state)
        return (
            <div>
                register
            </div>
        )
    }
}

export default Register;