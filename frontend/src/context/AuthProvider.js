import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // 初期認証状態の確認
        const checkAuth = async () => {
            try {
                await axios.get('/auth/checkAuth');
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
