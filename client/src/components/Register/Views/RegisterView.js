import React from 'react'
import './Register.css';
import { Alert } from 'react-bootstrap';

const RegisterView = ({username, email, passwordOne, passwordTwo, error, success, fetching, isInvalid, handleChange, handleSubmit}) => {
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
                    <tbody>
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                />
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div className="register_button_div">
                    <button
                        disabled={isInvalid || fetching}
                        onClick={handleSubmit}
                        >Create account
                    </button>
                </div>
                </form> 
            </div>
        </div>
    )
}

export default RegisterView