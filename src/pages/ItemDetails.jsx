import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const ItemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            const docRef = doc(db, "magicItems", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const fetchedItem = { id: docSnap.id, ...docSnap.data() };
                setItem(fetchedItem);

                // Зареждане на препоръчани артикули от същата категория
                const q = query(
                    collection(db, "magicItems"),
                    where("category", "==", fetchedItem.category)
                );
                const querySnapshot = await getDocs(q);
                const related = querySnapshot.docs
                    .filter((d) => d.id !== fetchedItem.id)
                    .map((d) => ({ id: d.id, ...d.data() }));
                setRelatedItems(related);
            } else {
                setItem(null);
            }
            setLoading(false);
        };

        fetchItem();
    }, [id]);

    if (loading) return <p className="text-yellow-300 p-6">Зареждане...</p>;
    if (!item) return <p className="text-red-400 p-6">Артикулът не беше намерен.</p>;

    return (
        <div className="p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-yellow-300 hover:text-yellow-500 underline"
            >
                ← Назад към каталога
            </button>

            <h1 className="text-4xl mb-4 text-yellow-300">{item.name}</h1>
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full max-w-md rounded shadow mb-6"
            />
            <p className="text-gray-300 mb-4">{item.description}</p>
            <p className="text-purple-400 mb-2">Категория: {item.category}</p>
            <p className="text-green-400 mb-6">Създаден от: {item.createdBy || "неизвестен магьосник"}</p>

            {relatedItems.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl text-yellow-200 mb-4">Още в категорията "{item.category}"</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedItems.map((related) => (
                            <div
                                key={related.id}
                                className="bg-gray-800 p-4 rounded shadow hover:scale-105 transition"
                            >
                                <img
                                    src={related.imageUrl}
                                    alt={related.name}
                                    className="w-full h-40 object-cover rounded"
                                />
                                <h3 className="text-lg text-yellow-200 mt-2">{related.name}</h3>
                                <p className="text-gray-400 text-sm">
                                    {related.description.slice(0, 60)}...
                                </p>
                                <Link
                                    to={`/item/${related.id}`}
                                    className="text-blue-400 hover:text-blue-500 underline text-sm mt-2 inline-block"
                                >
                                    Виж детайли
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemDetails;
