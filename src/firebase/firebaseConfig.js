import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC0CyOoroHicpPhK9wPRYKOCf-bUJx3nc8",
    authDomain: "mymagicapp-1acde.firebaseapp.com",
    projectId: "mymagicapp-1acde",
    storageBucket: "mymagicapp-1acde.firebasestorage.app",
    messagingSenderId: "939106252359",
    appId: "1:939106252359:web:66b5e2a3c399fd041d6362",
    measurementId: "G-HN0G2K7S0B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
