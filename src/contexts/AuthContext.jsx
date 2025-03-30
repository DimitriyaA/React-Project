import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const { user, logout } = useAuth(); // използвате useAuth хук

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children} {/* Това ще предаде user и logout на всички деца */}
        </AuthContext.Provider>
    );
};
