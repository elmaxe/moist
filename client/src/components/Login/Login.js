import React from 'react';
import './Login.css';
import * as ROUTES from '../../routes';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
                this.props.actions.setUser(true, true, json.id, json.email, json.username, json.profilePicture, json.regDate)
                this.setState({...initialState})
            }
        })
    }

    render() {

        const {email, password, error, loggingIn} = this.state;

        const isInvalid = email === '' || password === '';

        return (
            <div className="Login2">
                <form>
                <table>
                    <tr>
                        <th>Email</th>
                        <th>Password</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <input
                                autoFocus
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={this.handleChange}
                            />
                        </td>
                        <td>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handleChange}
                            />
                        </td>
                        <td>
                            <button
                                disabled={isInvalid || loggingIn}
                                onClick={this.handleSubmit}
                            
                            >{loggingIn ? "Logging in..." : "Login"}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <Link to="#">Forgot password?</Link>
                        </td>
                    </tr>
                </table>
                </form>
                {error && <Alert variant="danger">{error}</Alert>}
            </div>
        )
        // return (
        //     <div className="Login">
        //         <Form onSubmit={this.handleSubmit} className="LoginForm">
        //             <h1>Log in</h1>
        //             {error && <Alert variant="danger">{error}</Alert>}
        //             <Form.Group>
        //                 <Form.Label>Email address</Form.Label>
        //                 <Form.Control 
        //                     name="email"
        //                     type="text"
        //                     value={email}
        //                     placeholder="Email"
        //                     onChange={this.handleChange}
        //                 />
        //             </Form.Group>
        //             <Form.Group>
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control 
        //                     name="password"
        //                     type="password"
        //                     value={password}
        //                     placeholder="Password"
        //                     onChange={this.handleChange}
        //                 />
        //             </Form.Group>
        //             <Row>
        //                 <Button
        //                     variant="primary"
        //                     type="submit"
        //                     disabled={isInvalid}
        //                     className="LoginButton"
        //                 >
        //                 Sign in
        //                 </Button>
        //             </Row>
        //             <Row className="LoginLinks">
        //                 <Col vh={1}>
        //                     <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
        //                 </Col>
        //                 <Col vh={1}>
        //                     <Link to={ROUTES.REGISTER}>Register</Link>
        //                 </Col>
        //             </Row>
        //         </Form>
        //     </div>
        // )
    }
}


const bindPropsToActionCreators  = (dispatch) => {
    return {
        actions: bindActionCreators({setUser}, dispatch)
    }
}

export default connect(
    state => ({state}),
    bindPropsToActionCreators
)(Login);