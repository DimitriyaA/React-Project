import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { WandSparkles } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useAuthContext();

    return (
        <nav className="bg-gray-950 bg-opacity-80 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 backdrop-blur">
            <Link to="/" className="text-yellow-400 text-2xl flex items-center gap-2 font-bold">
                <WandSparkles /> Магически свят
            </Link>
            <div className="flex gap-6">
                <Link to="/catalog" className="hover:text-yellow-300 transition duration-300">Каталог</Link>
                <Link to="/map" className="hover:text-yellow-300 transition duration-300">Карта</Link>
                {user && (
                    <Link to="/add-item" className="hover:text-yellow-300 transition duration-300">Добави предмет</Link>
                )}

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <span className="text-green-400">Здравей, {user.email}</span>
                            <button
                                onClick={logout}
                                className="text-red-400 hover:text-red-500 transition duration-300"
                                aria-label="Изход"
                            >
                                Изход
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-green-300 transition duration-300">Вход</Link>
                            <Link to="/register" className="hover:text-green-300 transition duration-300">Регистрация</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
