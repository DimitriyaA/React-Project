import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import "../../styles/Auth.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password || !rePassword || !username) {
            alert(config.FILL_OUT_FIELDS_WARNING);
            return;
        }

        if (password !== rePassword) {
            alert(config.PASSWORDS_DO_NOT_MATCH);
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert(config.INVALID_EMAIL_WARNING);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: username });

            alert(config.REGISTRATION_SUCCESS);
            navigate("/");
        } catch (error) {
            alert(config.REGISTRATION_ERROR + error.message);
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
                <button type="submit" className="auth-button">Регистрирай се</button>
                <div className="auth-footer">
                    <p>Вече имате акаунт? <a href="/login">Влезте тук</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
