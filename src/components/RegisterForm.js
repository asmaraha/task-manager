import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password,
            });
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || 'Error registering user');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister} style={{ maxWidth: '400px' }}>
                {/* username and password fields */}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            <p className="mt-3">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}

export default RegisterForm;
