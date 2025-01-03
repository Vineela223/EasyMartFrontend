import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        token: localStorage.getItem('token') || null,
        firstName: localStorage.getItem('firstName') || null,
        lastName: localStorage.getItem('lastName') || null,
        emailId: localStorage.getItem('emailId') || null,
        role: localStorage.getItem('role') || null,
    });
    const [sessionExpired, setSessionExpired] = useState(false);

    // Login function to set user details and manage token expiry
    const login = (userData) => {
        const { token, firstName, lastName, emailId, role } = userData;
        
        setUser({
            token,
            firstName,
            lastName,
            emailId,
            role,
        });

        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('emailId', emailId);
        localStorage.setItem('role', role);

        // Decode token to set an auto-logout timer
        const decodedToken = jwtDecode(token);
        const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
        const timeUntilExpiry = expiryTime - Date.now();

        if (timeUntilExpiry > 0) {
            setTimeout(() => {
                setSessionExpired(true);
                logout();
            }, timeUntilExpiry);
        }
    };

    // Logout function to clear user details and localStorage
    const logout = () => {
        setUser({
            firstName: '',
            lastName: '',
            token: null,
            role: null,
            emailId: '',
        });
        localStorage.clear();

        // Display alert only if session expired automatically
        if (sessionExpired) {
            alert('Session expired. Please log in again.');
            setSessionExpired(false); // Reset for next session
        }
    };

    // Check token validity on app load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const isTokenValid = decodedToken.exp * 1000 > Date.now();
            
            if (isTokenValid) {
                setUser({
                    token,
                    firstName: localStorage.getItem('firstName'),
                    lastName: localStorage.getItem('lastName'),
                    emailId: localStorage.getItem('emailId'),
                    role: localStorage.getItem('role'),
                });

                // Set auto-logout timer based on token expiry
                const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
                setTimeout(() => {
                    setSessionExpired(true);
                    logout();
                }, timeUntilExpiry);
            } else {
                logout();
            }
        }
    }, []); // Run only once on mount

    const value = {
        user,
        login,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};
