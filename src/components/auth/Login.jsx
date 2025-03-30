import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Моля, попълнете всички полета.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError("Грешка при вход: " + error.message);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                <h2 className="auth-title">Вход в акаунт</h2>
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
                {error && <p className="auth-error">{error}</p>}
                <button type="submit" className="auth-button">Влезте</button>
                <div className="auth-footer">
                    <p>Нямате акаунт? <a href="/register">Регистрирайте се тук</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
