import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const logIn = (jwtToken) => {
        localStorage.setItem('jwt', jwtToken);
        setIsLoggedIn(true);
    };
    const logOut = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
