import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { WandSparkles } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { user, logout } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Функция за затваряне на менюто при клик на линк
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                {/* Лого */}
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <WandSparkles size={32} /> Магически свят
                </Link>

                {/* Бутон за сандвич меню */}
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    ☰
                </button>

                {/* Навигационни линкове */}
                <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
                    <Link to="/catalog" className="navbar-link" onClick={closeMenu}>Каталог</Link>
                    <Link to="/search" className="navbar-link" onClick={closeMenu}>Търсене в каталога</Link>
                    {user && <Link to="/add-item" className="navbar-link" onClick={closeMenu}>Добави предмет</Link>}
                    <Link to="/spellbook" className="navbar-link" onClick={closeMenu}>Магии</Link>
                    <Link to="/map" className="navbar-link" onClick={closeMenu}>Карта</Link>
                    {user && <Link to="/map/add" className="navbar-link" onClick={closeMenu}>Добави локация</Link>}
                    {user && <Link to="/profile" className="navbar-link" onClick={closeMenu}>Профил</Link>}

                    {/* Потребителски бутон */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-green-400 text-lg">Здравей, {user.email}</span>
                                <button onClick={() => { logout(); closeMenu(); }} className="navbar-button" aria-label="Изход">
                                    Изход
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="navbar-link" onClick={closeMenu}>Вход</Link>
                                <Link to="/register" className="navbar-link" onClick={closeMenu}>Регистрация</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
