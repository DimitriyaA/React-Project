import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Catalog = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            const snapshot = await getDocs(collection(db, "magicItems"));
            setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchItems();
    }, []);

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-6">
            <h1 className="text-4xl mb-6 text-yellow-300">Каталог на вълшебни предмети</h1>

            {/* Търсене и филтри */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Търси предмет..."
                    className="p-2 rounded w-full md:w-1/2 text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 rounded w-full md:w-1/4 text-black"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">Всички категории</option>
                    <option value="Артефакт">Артефакт</option>
                    <option value="Отвара">Отвара</option>
                    <option value="Книга">Книга</option>
                    <option value="Магически инструмент">Магически инструмент</option>
                </select>
            </div>

            {/* Показване на предметите */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-48 object-cover rounded mb-3"
                            />
                            <h3 className="text-xl mt-2 text-yellow-200">{item.name}</h3>
                            <p className="text-sm mt-1 text-gray-300">
                                {item.description.slice(0, 100)}...
                            </p>
                            <span className="inline-block mt-2 px-2 py-1 bg-purple-700 text-xs rounded-full self-start">
                                {item.category}
                            </span>
                            <Link
                                to={`/item/${item.id}`}
                                className="mt-auto text-yellow-400 hover:text-yellow-300 transition duration-300 underline pt-4 block"
                            >
                                Виж детайли
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-white">Няма намерени предмети.</p>
                )}
            </div>
        </div>
    );
};

export default Catalog;
