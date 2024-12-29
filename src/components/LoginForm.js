import React, { useState } from 'react';
import axios from 'axios';
import { setToken } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password,
            });
            // Store JWT in localStorage
            setToken(response.data.token);
            // Redirect to tasks page
            navigate('/tasks');
        } catch (error) {
            alert('Invalid credentials or server error');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={{ maxWidth: '400px' }}>
                {/* username and password fields */}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            {/*  Add a link to register  */}
            <p className="mt-3">
                Don&apos;t have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default LoginForm;
