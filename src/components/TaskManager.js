import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [priority, setPriority] = useState('MEDIUM');
    const [editTaskId, setEditTaskId] = useState(null);
    const navigate = useNavigate();

    // Attach token to every axios request (if not already set globally)
    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }, []);

    // Fetch tasks on load
    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tasks');
            setTasks(response.data);
        } catch (error) {
            // If unauthorized, token might be invalid/expired
            if (error.response && error.response.status === 401) {
                removeToken();
                navigate('/login');
            } else {
                console.error(error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editTaskId) {
                // Update existing task
                await axios.put(`http://localhost:8080/api/tasks/${editTaskId}`, {
                    title,
                    description,
                    status,
                    priority,
                });
                setEditTaskId(null);
            } else {
                // Create new task
                await axios.post('http://localhost:8080/api/tasks', {
                    title,
                    description,
                    status,
                    priority,
                });
            }

            // Reset form
            setTitle('');
            setDescription('');
            setStatus('PENDING');
            setPriority('MEDIUM');
            // Refresh tasks
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

    const handleDelete = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Task Manager</h2>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <hr />

            <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status:</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Priority:</label>
                    <select
                        className="form-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    {editTaskId ? 'Update Task' : 'Add Task'}
                </button>
            </form>

            <hr />
            <h3>Task List</h3>
            <table className="table table-striped">
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
                {tasks.map((t) => (
                    <tr key={t.id}>
                        <td>{t.title}</td>
                        <td>{t.description}</td>
                        <td>{t.status}</td>
                        <td>{t.priority}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEdit(t)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(t.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskManager;
