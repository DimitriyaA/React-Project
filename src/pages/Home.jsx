import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import MagicStars from "../components/MagicStars";
import MagicMap from "./MagicMap"; // Ако картата е компонент

const Home = () => {
    const [latestItems, setLatestItems] = useState([]);

    useEffect(() => {
        const fetchLatestItems = async () => {
            const q = query(collection(db, "magicItems"), orderBy("createdAt", "desc"), limit(5));
            const snapshot = await getDocs(q);
            setLatestItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchLatestItems();
    }, []);

    return (
        <div className="container">
            {/* Магически звезди */}
            <MagicStars />

            {/* Заглавие */}
            <h1>✨ Магически свят ✨</h1>
            <p className="text-xl text-gray-300 mb-10 italic">Открий артефакти, отвари и тайни от света на магията.</p>

            {/* Последно добавени предмети */}
            <h2>Последно добавени предмети</h2>
            <div className="grid-container">
                {latestItems.map((item) => (
                    <div key={item.id} className="card">
                        <img src={item.imageUrl} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>{item.description.slice(0, 80)}...</p>
                        <Link to={`/item/${item.id}`} className="link-btn">Виж детайли</Link>
                    </div>
                ))}
            </div>

            {/* Виж целия каталог */}
            <Link to="/catalog" className="link-btn">Виж целия каталог</Link>

            {/* Магическа карта */}
            <h2>Магическа карта</h2>
            <MagicMap />
            <Link to="/map" className="link-btn">Виж картата на магьосниците</Link>
        </div>
    );
};

export default Home;
