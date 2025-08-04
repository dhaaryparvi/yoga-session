// frontend/src/pages/RegisterLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';  // Assuming you created AuthContext

const RegisterLogin = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from AuthContext

    const API_BASE_URL = 'http://localhost:5000/api/auth'; // Adjust if your backend port is different

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            const endpoint = isRegister ? 'register' : 'login';
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, { email, password });

            toast.success(response.data.message || 'Operation successful!');
            if (!isRegister && response.data.token) {
                login(response.data.token); // Store token in context and localStorage
                navigate('/'); // Redirect to dashboard or home page
            } else if (isRegister) {
                // After successful registration, you might want to auto-login or prompt user to login
                toast.setMessage('Registration successful! Please login.');
                setIsRegister(false); // Switch to login form
            }
        } catch (error) {
            console.error('Auth error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
            {message && <p style={{ marginTop: '10px', color: message.includes('error') ? 'red' : 'green' }}>{message}</p>}
            <p style={{ marginTop: '15px' }}>
                {isRegister ? "Already have an account?" : "Don't have an account?"}
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', marginLeft: '5px' }}
                >
                    {isRegister ? 'Login' : 'Register'}
                </button>
            </p>
        </div>
    );
};

export default RegisterLogin;