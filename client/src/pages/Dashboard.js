// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications
import Navbar from '../components/Navbar'; // You'll create this soon

const Dashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(''); // REMOVED: Replaced by toast

    const API_BASE_URL = 'http://localhost:5000/api/sessions'; // Adjust if needed

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                setSessions(response.data);
            } catch (err) {
                console.error('Error fetching public sessions:', err);
                // CHANGED: Using toast.error instead of setError
                toast.error('Failed to load public sessions.');
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar />
                <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading public sessions...</p>
            </div>
        );
    }
    
    // REMOVED: No longer need this conditional rendering for errors, as toast handles the display.
    // if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <Navbar /> {/* Include your Navbar component */}
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Public Wellness Sessions</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px' }}>
                {sessions.length === 0 ? (
                    <p>No public sessions available yet.</p>
                ) : (
                    sessions.map((session) => (
                        <div key={session._id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', width: '300px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                            <h3>{session.title}</h3>
                            <p>Status: <span style={{ fontWeight: 'bold', color: session.status === 'published' ? 'green' : 'orange' }}>{session.status}</span></p>
                            <p>Tags: {session.tags.join(', ')}</p>
                            {session.jsonFileUrl && <p>JSON URL: <a href={session.jsonFileUrl} target="_blank" rel="noopener noreferrer">{session.jsonFileUrl}</a></p>}
                            <p style={{ fontSize: '0.9em', color: '#666' }}>Created: {new Date(session.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
