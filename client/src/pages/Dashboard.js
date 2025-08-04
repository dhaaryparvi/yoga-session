import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/image.png'; // Import the new background image

const Dashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = 'http://localhost:5000/api/sessions'; // Adjust if needed

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                setSessions(response.data);
            } catch (err) {
                console.error('Error fetching public sessions:', err);
                toast.error('Failed to load public sessions.');
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${backgroundImage})`,
                color: 'white' // Ensure text is visible on dark background
            }}>
                <Navbar />
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>Loading public sessions...</p>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${backgroundImage})`,
            paddingBottom: '40px', // Add some padding at the bottom
            position: 'relative', // Needed for potential overlays or fixed elements
        }}>
            <Navbar /> {/* Include your Navbar component */}
            <h1 style={{
                justifyContent: 'center', // This is for flex/grid, not direct text centering in h1
                textAlign: 'center',
                margin: '20px 0',
                fontSize: '2.5rem',
                fontWeight: 'heavy', // Changed from 'bold'
                color: 'white', // White text for better contrast
                // textShadow: '2px 2px 4px rgba(0,0,0,0.7)', // Stronger shadow for readability
                padding: '10px',
                backgroundColor: 'rgba(5,2,2,0.1)', // Changed color and opacity
                borderRadius: '8px',
                display: 'inline-block', // To make background color fit content
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '40px',
            }}>
                Public Wellness Sessions
            </h1>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '30px', // Increased gap between cards
                padding: '20px',
                marginTop: '20px',
                // backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
                {sessions.length === 0 ? (
                    <p style={{
                        color: 'white',
                        fontSize: '1.2rem',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        padding: '20px',
                        borderRadius: '10px'
                    }}>
                        No public sessions available yet.
                    </p>
                ) : (
                    sessions.map((session) => (
                        <div key={session._id} style={{
                            // backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            //  backgroundColor: 'rgba(0,0,0,0.3)', // Slightly more opaque white
                            backgroundColor: 'rgba(255, 255, 255, 0.0)', /* Semi-transparent background */
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)', // Lighter border
                            borderRadius: '15px', // More rounded corners
                            padding: '25px', // Increased padding
                            width: '320px', // Slightly wider cards
                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)', // Stronger shadow
                            transition: 'transform 0.3s ease-in-out', // Hover effect
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: '220px' // Ensure minimum height for consistency
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <h3 style={{
                                fontSize: '1.7rem', // Larger title
                                fontWeight: 'bold',
                                color: '#fff', // Darker text for contrast on card
                                marginBottom: '10px',
                                textShadow: '0 1px 1px rgba(0,0,0,0.1)'
                            }}>{session.title || '(No Title)'}</h3>
                            <p style={{
                                fontSize: '1rem',
                                color: '#fff',
                                marginBottom: '5px'
                            }}>
                                Status: <span style={{ fontWeight: 'bold', color: session.status === 'published' ? '#28a745' : '#ffc107' }}>
                                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                </span>
                            </p>
                            <p style={{
                                fontSize: '0.95rem',
                                color: '#fff',
                                marginBottom: '10px'
                            }}>
                                Tags: {session.tags && session.tags.length > 0 ? session.tags.join(', ') : 'None'}
                            </p>
                            {session.jsonFileUrl && (
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#007bff',
                                    wordBreak: 'break-all', // Ensure long URLs wrap
                                    marginBottom: '10px'
                                }}>
                                    JSON URL: <a href={session.jsonFileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>
                                        Link
                                    </a>
                                </p>
                            )}
                            <p style={{
                                fontSize: '0.85rem',
                                color: '#ff',
                                marginTop: 'auto' // Push to bottom
                            }}>
                                Created: {new Date(session.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
