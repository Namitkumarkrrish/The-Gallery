import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { animateLogoutExit } from './logoutAnimation';
import styles from './Logout.module.css';

const Logout = () => {
    const navigate = useNavigate();
    const btnRef = useRef(null);

    const handleLogout = () => {
        // We target the parent element to animate the whole "view" out
        const pageContent = btnRef.current.closest('div'); 
        
        animateLogoutExit(pageContent, () => {
            localStorage.removeItem('token');
            navigate('/login');
        });
    };

    return (
        <button 
            ref={btnRef}
            className={styles.logoutBtn}
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

export default Logout;