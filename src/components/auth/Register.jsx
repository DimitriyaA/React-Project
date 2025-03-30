import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password || !rePassword || !username) {
            setError("Моля, попълнете всички полета.");
            return;
        }

        if (password !== rePassword) {
            setError("Паролите не съвпадат.");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            setError("Моля, въведете валиден имейл адрес.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: username });

            navigate("/");
        } catch (error) {
            setError("Грешка при регистрация: " + error.message);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleRegister} className="auth-form">
                <h2 className="auth-title">Регистрация</h2>
                <input
                    type="text"
                    placeholder="Потребителско име"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Парола"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Потвърдете паролата"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />
                {error && <p className="auth-error">{error}</p>}
                <button type="submit" className="auth-button">Регистрирай се</button>
                <div className="auth-footer">
                    <p>Вече имате акаунт? <a href="/login">Влезте тук</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
