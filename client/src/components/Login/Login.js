import React from 'react';
import './Login.css';
import * as ROUTES from '../../routes';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from 'firebase';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import setUser from '../../actions/user'

import FirebaseContext, {withFirebase} from '../Firebase'

const initialState = {
    email: '',
    password: '',
    error: '',
}

class Login extends React.Component {
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
        const {email, password} = this.state;

        this.props.firebase.doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
            if (authUser.user.emailVerified) {
                this.setState({... initialState})
                this.props.actions.setUser(authUser.user)
            } else {
                this.setState(() => ({error:{message:"Account not yet verified. Verify your account to sign in."}}))
            }
            
        })
        .catch(error => {
            this.setState({error})
        })
    }

    render() {

        const {email, password, error} = this.state;

        const isInvalid = email === '' || password === '';

        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit} className="LoginForm">
                    <h1>Log in</h1>
                    {error && <Alert variant="danger">{error.message}</Alert>}
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            name="email"
                            type="text"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="password"
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Row>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isInvalid}
                            className="LoginButton"
                        >
                        Sign in
                        </Button>
                    </Row>
                    <Row className="LoginLinks">
                        <Col vh={1}>
                            <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
                        </Col>
                        <Col vh={1}>
                            <Link to={ROUTES.REGISTER}>Register</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

const LoginPage = withFirebase(Login)

const bindPropsToActionCreators  = (dispatch) => {
    return {
        actions: bindActionCreators({setUser}, dispatch)
    }
}

export default connect(
    state => ({state}),
    bindPropsToActionCreators
)(LoginPage);