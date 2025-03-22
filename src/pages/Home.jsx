import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <motion.h1
                className="text-5xl md:text-7xl font-bold text-yellow-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                Магическият Свят
            </motion.h1>
            <p className="mt-4 text-lg max-w-xl">
                Открий вълшебни артефакти, изследвай магическите локации и създай своя собствена колекция!
            </p>
            <div className="mt-6 flex gap-4">
                <Link to="/catalog" className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition-all">
                    Каталог
                </Link>
                <Link to="/map" className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-all">
                    Карта на магьосниците
                </Link>
            </div>
        </div>
    );
};

export default Home;
