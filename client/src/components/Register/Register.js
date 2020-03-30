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
            <div className="Register2">
                <div className="register_title">
                    <h1>Create new account</h1>
                    It takes just a minute.
                </div>
                <div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="primary">Registration successful! Sign in above.</Alert>}
                    <Alert variant="danger">Don't enter sensitive data in this form (or on this site) if there is no secure HTTPS connection. <a href="https://support.google.com/webmasters/answer/6073543" rel="noopener noreferrer" target="_blank">Learn more!</a></Alert>
                    <form>
                    <table>
                        <tr>
                            <th>
                                Email
                            </th>
                            <th className="input">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                Username
                            </th>
                            <th className="input">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={this.handleChange}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                Password
                            </th>
                            <th className="input">
                                <input
                                    type="password"
                                    name="passwordOne"
                                    placeholder="Password"
                                    value={passwordOne}
                                    onChange={this.handleChange}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                Confirm password
                            </th>
                            <th className="input">
                                <input
                                    type="password"
                                    name="passwordTwo"
                                    placeholder="Confirm password"
                                    value={passwordTwo}
                                    onChange={this.handleChange}
                                />
                            </th>
                        </tr>
                    </table>
                    <div className="register_button_div">
                        <button
                            disabled={isInvalid || fetching}
                            onClick={this.handleSubmit}
                            >Create account
                        </button>
                    </div>
                    </form>
                    
                </div>
            </div>
        )

        // return (
        //     <div className="Register">
        //         <Form className="RegisterForm" onSubmit={this.handleSubmit}>
        //             <h1>Register</h1>
        //             {error && <Alert variant="danger">{error}</Alert>}
        //             {success && <Alert variant="success">Registration successful!<br /><Link to={ROUTES.LOGIN}>Sign in</Link></Alert>}
        //             <Form.Group>
        //                 <Form.Label>Email address</Form.Label>
        //                 <Form.Control 
        //                     name="email"
        //                     type="email"
        //                     value={email}
        //                     placeholder="Email"
        //                     onChange={this.handleChange}
        //                 />
        //             </Form.Group>
        //             <Form.Group>
        //                 <Form.Label>Username</Form.Label>
        //                 <Form.Control 
        //                     name="username"
        //                     type="text"
        //                     value={username}
        //                     placeholder="Username"
        //                     onChange={this.handleChange}
        //                 />
        //             </Form.Group>
        //             <Form.Group>
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control 
        //                     name="passwordOne"
        //                     type="password"
        //                     value={passwordOne}
        //                     placeholder="Password"
        //                     onChange={this.handleChange}
        //                 />
        //             </Form.Group>
        //             <Form.Group>
        //                 <Form.Label>Confirm password</Form.Label>
        //                 <Form.Control 
        //                     name="passwordTwo"
        //                     type="password"
        //                     value={passwordTwo}
        //                     placeholder="Confirm password"
        //                     onChange={this.handleChange}
        //                 />
        //             </Form.Group>
        //             <Row>
        //                 <Button
        //                     variant="primary"
        //                     type="submit"
        //                     disabled={isInvalid}
        //                     className="RegisterButton"
        //                     >
        //                     Register
        //                 </Button>   
        //             </Row>
        //             <Col className="RegisterLinks">
        //                 {/* <Col vh={1}> */}
        //                 <Link to={ROUTES.LOGIN}>Sign in</Link>
        //                 {/* </Col> */}
        //                 {/* <Col vh={1}> */}
        //                     {/* <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password</Link>                     */}
        //                 {/* </Col> */}
        //             </Col>
        //         </Form>
        //     </div>
        // )
    }
}

export default Register;