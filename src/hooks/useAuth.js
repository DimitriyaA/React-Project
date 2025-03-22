// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log("Logged out successfully!");
            })
            .catch((error) => {
                console.error("Error during logout: ", error);
            });
    };

    return { user, logout };
};
