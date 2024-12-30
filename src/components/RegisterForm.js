import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.register({ username, password });
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            alert('Error registering user');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister} style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                    <label>Username:</label>
                    <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}


export default RegisterForm;
