import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { WandSparkles } from "lucide-react";
import './Navbar.css';  // Импортираме CSS файла

const Navbar = () => {
    const { user, logout } = useAuthContext();

    return (
        <nav className="navbar">
            <div className="navbar-content">
                {/* Лого с магическа пръчка */}
                <Link to="/" className="navbar-logo">
                    <WandSparkles size={32} /> Магически свят
                </Link>

                {/* Навигационни линкове и потребителски бутон */}
                <div className="navbar-links">
                    <Link to="/catalog" className="navbar-link">Каталог</Link>
                    <Link to="/search" className="navbar-link">Търсене в каталога</Link>
                    {/* Бутона за добавяне на предмет, видим само ако има потребител */}
                    {user && (
                        <Link to="/add-item" className="navbar-link">Добави предмет</Link>
                    )}

                    <Link to="/spellbook" className="navbar-link">Магии</Link>
                    <Link to="/map" className="navbar-link">Карта</Link>

                    {user && (
                        <Link to="/map/add" className="navbar-link">Добави локация</Link>
                    )}

                    {user && (
                        <Link to="/profile" className="navbar-link">Потребителски профил</Link>
                    )}

                    {/* Потребителски бутон */}
                    <div className="flex items-center gap-8">
                        {user ? (
                            <>
                                <span className="text-green-400 text-lg">Здравей, {user.email}</span>
                                <button
                                    onClick={logout}
                                    className="navbar-button"
                                    aria-label="Изход"
                                >
                                    Изход
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="navbar-link">Вход</Link>
                                <Link to="/register" className="navbar-link">Регистрация</Link>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
