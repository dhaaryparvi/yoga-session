import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import backgroundImage from '../assets/front.png'; // Import the local image file

const App = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const API_BASE_URL = 'http://localhost:5000/api/auth';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isRegister ? 'register' : 'login';
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, { email, password });

      toast.success(response.data.message || 'Operation successful!');
      if (!isRegister && response.data.token) {
        login(response.data.token);
        navigate('/dashboard');
      } else if (isRegister) {
        toast.success('Registration successful! Please login.');
        setIsRegister(false);
      }
    } catch (error) {
      console.error('Auth error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    // Main container for the full-screen background image with flexbox for centering
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '1rem',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(${backgroundImage})`,
    }}>
      {/* Login/Register card with a semi-transparent background */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        backdropFilter: 'blur(50px)', // Frosted glass effect
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Large shadow
        width: '100%',
        maxWidth: '28rem', // max-w-md equivalent
      }}>
        <h2 style={{
          fontSize: '1.875rem', // text-3xl
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#1f2937', // gray-800
        }}>
          {isRegister ? 'Register' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem', // space-y-4
        }}>
          <div>
            <label style={{
              display: 'block',
              color: '#374151', // gray-700
              fontWeight: '500', // medium
              marginBottom: '0.25rem',
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db', // gray-300
                borderRadius: '0.375rem', // rounded-md
                outline: 'none',
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              color: '#374151',
              fontWeight: '500',
              marginBottom: '0.25rem',
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#2563eb', // blue-600
              color: 'white',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              fontWeight: '600', // semibold
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} // hover:bg-blue-700
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          color: '#4b5563', // gray-600
          marginTop: '1.5rem',
        }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontWeight: '500',
              marginLeft: '0.25rem',
              cursor: 'pointer',
            }}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default App;
