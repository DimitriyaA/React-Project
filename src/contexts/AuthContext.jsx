// src/contexts/AuthContext.jsx
import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const { user, logout } = useAuth();

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
