import React, { useEffect, useState } from 'react';

import { getToken, removeToken, isLoggedIn } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';


function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [priority, setPriority] = useState('MEDIUM');
    const [editTaskId, setEditTaskId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) navigate('/login');
        fetchTasks();
    }, [ ]);

    const fetchTasks = async () => {
        try {
            const { data } = await api.getTasks();
            setTasks(data);
        } catch (error) {
            if (error.response?.status === 401) {
                removeToken();
                navigate('/login');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editTaskId) {
                await api.updateTask(editTaskId, { title, description, status, priority });
                setEditTaskId(null);
            } else {
                await api.createTask({ title, description, status, priority });
            }
            setTitle('');
            setDescription('');
            setStatus('PENDING');
            setPriority('MEDIUM');
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (task) => {
        setEditTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.deleteTask(id);
            fetchTasks();
        }
    };

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
                <h2>Task Manager</h2>
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label>Title:</label>
                    <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Description:</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Status:</label>
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="PENDING">PENDING</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Priority:</label>
                    <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    {editTaskId ? 'Update Task' : 'Add Task'}
                </button>
            </form>
            <table className="table mt-5">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.status}</td>
                        <td>{task.priority}</td>
                        <td>
                            <button onClick={() => handleEdit(task)} className="btn btn-warning btn-sm me-2">Edit</button>
                            <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskManager;
