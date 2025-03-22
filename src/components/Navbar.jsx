import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { WandSparkles } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useAuthContext();

    return (
        <nav className="bg-transparent p-6 fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-lg">
            <div className="flex justify-between items-center">
                {/* Лого с магическа пръчка */}
                <Link to="/" className="text-yellow-400 text-4xl font-extrabold flex items-center gap-3 transition duration-300 hover:text-yellow-500">
                    <WandSparkles size={32} /> Магически свят
                </Link>

                {/* Навигационни линкове */}
                <div className="flex gap-8">
                    <Link to="/catalog" className="text-white hover:text-yellow-300 transition duration-300 text-lg">Каталог</Link>
                    <Link to="/map" className="text-white hover:text-yellow-300 transition duration-300 text-lg">Карта</Link>
                    {user && (
                        <Link to="/add-item" className="hover:text-yellow-300 transition duration-300 text-lg">Добави предмет</Link>
                    )}

                    {/* Потребителски бутон */}
                    <div className="flex items-center gap-8">
                        {user ? (
                            <>
                                <span className="text-green-400 text-lg">Здравей, {user.email}</span>
                                <button
                                    onClick={logout}
                                    className="text-red-400 hover:text-red-500 transition duration-300 text-lg"
                                    aria-label="Изход"
                                >
                                    Изход
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-green-300 transition duration-300 text-lg">Вход</Link>
                                <Link to="/register" className="hover:text-green-300 transition duration-300 text-lg">Регистрация</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
