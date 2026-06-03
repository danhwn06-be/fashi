import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Breadcrumb from "../components/Breadcrumb";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', 
                { email, password });
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.dispatchEvent(new Event('authChanged'));

            alert(response.data.message);
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || "Login failed, Please check your credentials.");
        }
    };

    return (
        <>
            <Breadcrumb currentTitle="Login" links={[{ name: "Home", url: "/" }]} />

            <div className="register-login-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="login-form">
                                <h2>Login</h2>
                                <form onSubmit={handleLogin}>
                                    <div className="group-input">
                                        <label htmlFor="email">Email address *</label>
                                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="pass">Password *</label>
                                        <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="site-btn login-btn">Sign In</button>
                                </form>
                                <div className="switch-login">
                                    <Link to="/register" className="or-login">Or Create An Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;