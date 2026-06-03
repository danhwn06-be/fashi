import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";

const Register = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username, first_name: firstName, last_name: lastName, address, phone, email, password
            });
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed. Please try again."); 
        }
    };

    return (
        <>
            <Breadcrumb currentTitle="Register" links={[{ name: "Home", url: "/" }]} />

            <div className="register-login-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="register-form">
                                <h2>Register</h2>
                                <form onSubmit={handleRegister}>
                                    <div className="group-input">
                                        <label htmlFor="username">Username (Display Name) *</label>
                                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="firstName">First Name *</label>
                                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="address">Address *</label>
                                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="email">Email address *</label>
                                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="pass">Password *</label>
                                        <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="site-btn register-btn">REGISTER</button>
                                </form>
                                <div className="switch-login">
                                    <Link to="/login" className="or-login">Or Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;