// frontend/src/pages/MySessions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast for notifications
import Navbar from '../components/Navbar';

const MySessions = () => {
    const [mySessions, setMySessions] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(''); // REMOVED: Replaced by toast

    const API_BASE_URL = 'http://localhost:5000/api/sessions';

    useEffect(() => {
        const fetchMySessions = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Optional: Handle case where token is missing before the request
                    // This scenario should ideally be handled by the PrivateRoute component
                    // but it's good practice to have a check here as well.
                    toast.error('Authentication token missing. Please log in.');
                    setLoading(false);
                    return;
                }
                const response = await axios.get(`${API_BASE_URL}/my-sessions`, {
                    headers: { 'x-auth-token': token }
                });
                setMySessions(response.data);
            } catch (err) {
                console.error('Error fetching my sessions:', err.response?.data || err.message);
                // CHANGED: Using toast.error instead of setError
                toast.error(err.response?.data?.message || 'Failed to load your sessions. Please log in again.');
            } finally {
                setLoading(false);
            }
        };
        fetchMySessions();
    }, []);

    if (loading) {
      return (
        <div>
          <Navbar />
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading your sessions...</p>
        </div>
      );
    }

    // REMOVED: No longer need this conditional rendering for errors, as toast handles the display.
    // if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>My Wellness Sessions</h1>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link to="/my-sessions/new" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                    Create New Session
                </Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px' }}>
                {mySessions.length === 0 ? (
                    <p>You haven't created any sessions yet. Click "Create New Session" to start!</p>
                ) : (
                    mySessions.map((session) => (
                        <div key={session._id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', width: '300px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                            <h3>{session.title || '(No Title)'}</h3>
                            <p>Status: <span style={{ fontWeight: 'bold', color: session.status === 'published' ? 'green' : 'orange' }}>{session.status}</span></p>
                            <p>Tags: {session.tags && session.tags.length > 0 ? session.tags.join(', ') : 'None'}</p>
                            <p style={{ fontSize: '0.9em', color: '#666' }}>Updated: {new Date(session.updatedAt).toLocaleDateString()}</p>
                            <Link to={`/my-sessions/edit/${session._id}`} style={{ display: 'block', textAlign: 'center', marginTop: '10px', padding: '8px 12px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                                Edit
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MySessions;
