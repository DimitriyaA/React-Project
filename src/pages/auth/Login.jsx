import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError("Грешка при вход: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded-xl shadow-md text-white">
                <h2 className="text-2xl mb-4">Вход в акаунт</h2>

                {/* Email */}
                <input
                    className="w-full p-2 mb-2 text-black"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Парола */}
                <input
                    className="w-full p-2 mb-2 text-black"
                    type="password"
                    placeholder="Парола"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Ако има грешка */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Бутон за логин */}
                <button
                    type="submit"
                    className="bg-purple-600 px-4 py-2 rounded-lg w-full"
                >
                    Влезте
                </button>

                {/* Линк към регистрация */}
                <div className="mt-4 text-center text-gray-300">
                    <p>Нямате акаунт? <a href="/register" className="text-blue-400 hover:text-blue-600">Регистрирайте се тук</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
