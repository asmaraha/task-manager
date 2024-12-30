import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskManager from './components/TaskManager';

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Navigate to="/tasks" />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/tasks" element={<TaskManager />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
