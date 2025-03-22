import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Проверка за съвпадение на паролите
        if (password !== rePassword) {
            setError("Паролите не съвпадат");
            return;
        }

        try {
            // Регистрация на потребител с email и парола
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Актуализиране на профила с потребителско име
            await updateProfile(user, {
                displayName: username,
            });

            navigate("/");
        } catch (error) {
            setError("Грешка при регистрация: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleRegister} className="bg-gray-900 p-6 rounded-xl shadow-md text-white">
                <h2 className="text-2xl mb-4">Регистрация</h2>

                {/* Потребителско име */}
                <input
                    className="w-full p-2 mb-2 text-black"
                    type="text"
                    placeholder="Потребителско име"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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

                {/* Потвърдете паролата */}
                <input
                    className="w-full p-2 mb-2 text-black"
                    type="password"
                    placeholder="Потвърдете паролата"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />

                {/* Ако има грешка */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Бутон за регистрация */}
                <button
                    type="submit"
                    className="bg-green-600 px-4 py-2 rounded-lg w-full"
                >
                    Регистрирай се
                </button>

                {/* Линк към логин страницата */}
                <div className="mt-4 text-center text-gray-300">
                    <p>Вече имате акаунт? <a href="/login" className="text-blue-400 hover:text-blue-600">Влезте тук</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
