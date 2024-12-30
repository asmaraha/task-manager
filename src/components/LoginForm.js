import React, { useState } from 'react';

import { setToken } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.login({ username, password });
            setToken(data.token);
            navigate('/tasks');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                    <label>Username:</label>
                    <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="mt-3">Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
}

export default LoginForm;
