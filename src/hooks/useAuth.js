import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Добавяме loading state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Спираме зареждането
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out successfully!");
        } catch (error) {
            console.error("Error during logout: ", error);
        }
    };

    return {
        user,
        isAuthenticated: !!user, // Добавяме isAuthenticated
        loading,
        logout
    };
};

export default useAuth;
