import React from 'react'
import './Login.css';

import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginView = ({email, password, error, loggingIn, isInvalid, handleChange, handleSubmit}) => {
    return (
        <div className="Login2">
            <form>
                <table>
                    <tbody>
                        <tr>
                            <th id="logintitle">Email</th>
                            <th id="logintitle">Password</th>
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
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <button
                                    disabled={isInvalid || loggingIn}
                                    onClick={handleSubmit}
                                    id="loginbtn"
                                >Login</button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                {/* <Link to="#">Forgot password?</Link> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            {error && <Alert style={{fontSize: "2vh"}} variant="danger">{error}</Alert>}
            </form>
        </div>
    )
}

export default LoginView