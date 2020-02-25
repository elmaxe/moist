import React, { useState, Component } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Register.css';

import * as ROUTES from '../../routes';

const initialState = {
    email: '',
    username: '',
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
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {

        const {username, email, passwordOne, passwordTwo, error} = this.state;

        const isInvalid = username === '' || email === '' || passwordOne === '' || passwordTwo === '';

        return (
            <div className="Register">
                <Form className="RegisterForm" onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
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
                        <Col vh={1}>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isInvalid}
                            >
                            Register
                        </Button>                        
                        </Col>

                        <Col vh={1}>
                            <Link to={ROUTES.LOGIN}>Log in</Link>
                            <br />
                            <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password</Link>                    
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Register;