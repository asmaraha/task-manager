import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-dark text-white py-3">
            <div className="container d-flex justify-content-between">
                <h1>Task Management APP</h1>
                <nav>
                    <Link to="/login" className="text-white text-decoration-none me-3">Login</Link>
                    <Link to="/register" className="text-white text-decoration-none me-3">Register</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
