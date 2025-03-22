import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.error("Грешка при вход:", error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded-xl shadow-md text-white">
                <h2 className="text-2xl mb-4">Вход</h2>
                <input className="w-full p-2 mb-2 text-black" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full p-2 mb-2 text-black" type="password" placeholder="Парола" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-purple-600 px-4 py-2 rounded-lg">Влез</button>
            </form>
        </div>
    );
};

export default Login;
