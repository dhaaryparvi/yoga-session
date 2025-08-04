// frontend/src/pages/SessionEditor.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast for notifications
import Navbar from '../components/Navbar';

const SessionEditor = () => {
    const { id } = useParams(); // Get session ID from URL if editing
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState(''); // Comma-separated string
    const [jsonFileUrl, setJsonFileUrl] = useState('');
    const [sessionId, setSessionId] = useState(id || null); // Store actual session ID
    // const [message, setMessage] = useState(''); // REMOVED: Replaced by toast
    const [isSaving, setIsSaving] = useState(false);

    const autoSaveTimeoutRef = useRef(null);
    const API_BASE_URL = 'http://localhost:5000/api/sessions'; // Adjust if needed

    // Fetch session data if editing
    useEffect(() => {
        if (id) {
            const fetchSession = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${API_BASE_URL}/my-sessions/${id}`, {
                        headers: { 'x-auth-token': token }
                    });
                    const session = response.data;
                    setTitle(session.title);
                    setTags(session.tags.join(', '));
                    setJsonFileUrl(session.jsonFileUrl);
                    setSessionId(session._id); // Ensure we use the actual ID from DB
                } catch (err) {
                    console.error('Error fetching session for edit:', err.response?.data || err.message);
                    // CHANGED: Using toast.error instead of setMessage
                    toast.error(err.response?.data?.message || 'Failed to load session for editing.');
                }
            };
            fetchSession();
        }
    }, [id]);

    const handleSaveDraft = useCallback(async () => {
        if (!title.trim() && !tags.trim() && !jsonFileUrl.trim()) {
            // CHANGED: Using toast.warn for a warning message
            toast.warn('Cannot save empty session as draft.');
            return;
        }

        setIsSaving(true);
        // CHANGED: Using toast.info for a temporary message
        toast.info('Saving draft...');
        try {
            const token = localStorage.getItem('token');
            const sessionData = {
                id: sessionId, // Will be null for new sessions, existing ID for updates
                title: title.trim(),
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                jsonFileUrl: jsonFileUrl.trim(),
            };
            const response = await axios.post(`${API_BASE_URL}/save-draft`, sessionData, {
                headers: { 'x-auth-token': token }
            });
            setSessionId(response.data.session._id); // Update ID for subsequent saves
            // CHANGED: Using toast.success for a success message
            toast.success('Draft saved successfully!');
        } catch (error) {
            console.error('Error saving draft:', error.response?.data || error.message);
            // CHANGED: Using toast.error for an error message
            toast.error(error.response?.data?.message || 'Failed to save draft.');
        } finally {
            setIsSaving(false);
        }
    }, [title, tags, jsonFileUrl, sessionId]);

    // Auto-save debounce effect
    useEffect(() => {
        // Only trigger auto-save if there's content in any field
        if (title || tags || jsonFileUrl) {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
            autoSaveTimeoutRef.current = setTimeout(() => {
                handleSaveDraft();
            }, 5000); // 5 seconds of inactivity
        }

        return () => {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
        };
    }, [title, tags, jsonFileUrl, handleSaveDraft]); // Dependencies for auto-save

    const handlePublish = async () => {
        if (!title.trim()) {
            // CHANGED: Using toast.warn for a warning message
            toast.warn('Title is required to publish a session.');
            return;
        }
        setIsSaving(true);
        // CHANGED: Using toast.info for a temporary message
        toast.info('Publishing session...');
        try {
            const token = localStorage.getItem('token');
            const sessionData = {
                id: sessionId,
                title: title.trim(),
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                jsonFileUrl: jsonFileUrl.trim(),
            };
            await axios.post(`${API_BASE_URL}/publish`, sessionData, {
                headers: { 'x-auth-token': token }
            });
            // CHANGED: Using toast.success for a success message
            toast.success('Session published successfully!');
            navigate('/my-sessions'); // Redirect to my sessions page
        } catch (error) {
            console.error('Error publishing session:', error.response?.data || error.message);
            // CHANGED: Using toast.error for an error message
            toast.error(error.response?.data?.message || 'Failed to publish session.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', maxWidth: '600px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>{id ? 'Edit Session' : 'Create New Session'}</h2>
                <form>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                        />
                    </div>
                    <div>
                        <label>Tags (comma-separated):</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                            placeholder="e.g., yoga, meditation, mindfulness"
                        />
                    </div>
                    <div>
                        <label>JSON File URL (Optional):</label>
                        <input
                            type="text"
                            value={jsonFileUrl}
                            onChange={(e) => setJsonFileUrl(e.target.value)}
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                            placeholder="e.g., https://example.com/session-data.json"
                        />
                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            disabled={isSaving}
                            style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            {isSaving ? 'Saving...' : 'Save as Draft'}
                        </button>
                        <button
                            type="button"
                            onClick={handlePublish}
                            disabled={isSaving}
                            style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Publish
                        </button>
                    </div>
                </form>
                {/* REMOVED: No longer needed with toasts */}
                {/* {message && (
                    <p style={{ marginTop: '15px', color: message.includes('success') ? 'green' : 'red' }}>
                        {message}
                    </p>
                )} */}
            </div>
        </div>
    );
};

export default SessionEditor;
