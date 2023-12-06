// Login.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Login.css';

const Login = () => {
    const initialFormData = {
        username: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [loginResult, setLoginResult] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const checkUserData = () => {
        const { username, password } = formData;
        const newErrors = {};

        if (!username) newErrors.username = "Username cannot be empty";
        if (!password) newErrors.password = "Password cannot be empty";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!checkUserData()) return;

        try {
            const response = await axios.post("https://localhost:7007/api/User/Login", formData);

            if (response.data && response.data.token) {
                const token = response.data.token;
                const username = response.data.username;

                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
                setLoginResult({ success: true, message: "Login successful!" });
                setIsLoggedIn(true);
            } else {
                setLoginResult({ success: false, message: "Login failed. Token not found in the response." });
            }
        } catch (err) {
            setLoginResult({ success: false, message: "Login failed. Please check your credentials." });
            console.log(err);
        } finally {
            setFormData(initialFormData);
        }
    };

    const handleLogout = () => {
        // Implement logout logic (clear local storage, reset state, etc.)
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
    };

    return (
        <div className="loginContainer">
            <div className="loginBox">
                <h2 className="loginHeader">Login</h2>
                <form className="loginForm" noValidate>
                    {Object.entries(formData).map(([field, value]) => (
                        <div className="form-group" key={field}>
                            <label>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field.includes("password") ? "password" : "text"}
                                className="passwordInput"
                                name={field}
                                value={value}
                                onChange={handleChange}
                            />
                            {errors[field] && <span className="error">{errors[field]}</span>}
                        </div>
                    ))}

                    {loginResult && (
                        <div className={`alert ${loginResult.success ? 'alert-success' : 'alert-danger'} mt-3`}>
                            {loginResult.message}
                        </div>
                    )}

                    <div className="form-group mt-3">
                        {isLoggedIn ? (
                            <button className="btn btn-danger button button-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <button className="btn btn-primary button-primary" onClick={handleLogin}>
                                Login
                            </button>
                        )}
                        <button className="btn btn-danger button button-danger ml-2">Cancel</button>
                    </div>

                    <div className="signup-link">
                        <p>
                            Don't have an account?
                            <Link to="/signup"> Sign up here</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
