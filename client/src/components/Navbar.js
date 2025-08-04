// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you created AuthContext

const Navbar = () => {
    const { token, logout } = useAuth(); // Get token and logout function
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clear token from context and localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav style={{ backgroundColor: '#333', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em' }}>Dashboard</Link>
                {token && ( // Show My Sessions only if logged in
                    <Link to="/my-sessions" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em' }}>My Sessions</Link>
                )}
            </div>
            <div>
                {token ? (
                    <button onClick={handleLogout} style={{ background: 'none', border: '1px solid white', color: 'white', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', padding: '8px 15px', border: '1px solid white', borderRadius: '4px' }}>
                        Login / Register
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;