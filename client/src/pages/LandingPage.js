import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/front.png'; // Assuming the same background image

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginRegisterClick = () => {
        navigate('/login');
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${backgroundImage})`,
            color: 'white',
            textAlign: 'center',
            position: 'relative', // Needed for absolute positioning of the button
        }}>
            {/* Login/Register button in the top-left corner */}
            <button
                onClick={handleLoginRegisterClick}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '10px 20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
                    border: '1px solid white',
                    borderRadius: '5px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    backdropFilter: 'blur(3px)',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
                Login / Register
            </button>

            {/* Main content of the landing page */}
            <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                margin: '0',
            }}>
                Welcome to Arvyax
            </h1>
            <p style={{
                fontSize: '1.5rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}>
                Your journey to wellness starts here.
            </p>
        </div>
    );
};

export default LandingPage;
