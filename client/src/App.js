// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterLogin from './pages/RegisterLogin';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import PrivateRoute from './components/PrivateRoute'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Create this component
import LandingPage from './pages/LandingPage';
function App() {
    return (
        <div className='App'>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<RegisterLogin />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* Public view */}
                <Route path="/my-sessions" element={<PrivateRoute><MySessions /></PrivateRoute>} />
                <Route path="/my-sessions/new" element={<PrivateRoute><SessionEditor /></PrivateRoute>} />
                <Route path="/my-sessions/edit/:id" element={<PrivateRoute><SessionEditor /></PrivateRoute>} />
            </Routes>
        </Router>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        </div>
    );
}
export default App;