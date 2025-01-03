import React from 'react';
import { useUser } from '../../CONTEXT/UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useUser();
    const navigate = useNavigate(); // Hook to navigate

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page
    };

    return (
        <button onClick={handleLogout} className='logout-button'>
            Logout
        </button>
    );
};

export default Logout;
