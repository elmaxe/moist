import React, { useState, Component } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Register.css';

import * as ROUTES from '../../routes';
import { FirebaseContext } from '../Firebase';
import {connect} from 'react-redux';

const initialState = {
    email: '',
    username: '',
    passwordOne: '',
    passwordTwo: '',
    error: '',
    success: false,
}

const SignUpPage = () => {
    return (
        <FirebaseContext.Consumer>
            {firebase => <Register firebase={firebase}/>}
        </FirebaseContext.Consumer>
    )
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
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const {username, email, passwordOne} = this.state;

        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            this.setState(() => ({... initialState}), () => this.setState({success:true}));
        })
        .catch(error => {
            this.setState({error, success: false});
        })
    }

    render() {

        const {username, email, passwordOne, passwordTwo, error, success} = this.state;

        const isInvalid = username === '' || email === '' || passwordOne === '' || passwordTwo === '' || passwordOne !== passwordTwo;

        return (
            <div className="Register">
                <Form className="RegisterForm" onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    {error && <Alert variant="danger">{error.message}</Alert>}
                    {success && <Alert variant="success">Registration successful!<br /><Link to={ROUTES.LOGIN}>Sign in</Link></Alert>}
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            name="email"
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            name="username"
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="passwordOne"
                            type="password"
                            value={passwordOne}
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control 
                            name="passwordTwo"
                            type="password"
                            value={passwordTwo}
                            placeholder="Confirm password"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Row>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isInvalid}
                            className="RegisterButton"
                            >
                            Register
                        </Button>   
                    </Row>
                    <Col className="RegisterLinks">
                        {/* <Col vh={1}> */}
                        <Link to={ROUTES.LOGIN}>Sign in</Link>
                        {/* </Col> */}
                        {/* <Col vh={1}> */}
                            {/* <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password</Link>                     */}
                        {/* </Col> */}
                    </Col>
                </Form>
            </div>
        )
    }
}

export default SignUpPage;