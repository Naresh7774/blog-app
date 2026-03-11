import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const checkUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // Provide authentication token in fetch/axios headers
    const getAuthHeader = () => {
        return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, getAuthHeader }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
