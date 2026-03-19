import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const { user, logout } = useAuth(); // using the useAuth hook

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children} {/* This will pass user and logout to all children */}
        </AuthContext.Provider>
    );
};
