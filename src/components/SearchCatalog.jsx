import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/SearchCatalog.css";

const SearchCatalog = () => {
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

    const handleSearch = () => {
        const filteredItems = items.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
            return matchesSearch && matchesCategory;
        });
        setItems(filteredItems);
    };

    return (
        <div className="search-catalog-container">
            <h1 className="search-catalog-title">Каталог на вълшебни предмети</h1>

            <div className="search-catalog-form-container">
                <input
                    type="text"
                    placeholder="Търси предмет..."
                    className="search-catalog-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="search-catalog-select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">Всички категории</option>
                    <option value="Артефакт">Артефакт</option>
                    <option value="Отвара">Отвара</option>
                    <option value="Книга">Книга</option>
                    <option value="Магически инструмент">Магически инструмент</option>
                </select>
                <button
                    className="search-catalog-button"
                    onClick={handleSearch}
                >
                    Търсене
                </button>
            </div>

            <div className="search-catalog-items">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="search-catalog-item">
                            <img src={item.imageUrl} alt={item.name} />
                            <h3 className="search-catalog-item-title">{item.name}</h3>
                            <p className="search-catalog-item-description">{item.description.slice(0, 100)}...</p>
                            <span className="search-catalog-item-footer">{item.category}</span>
                        </div>
                    ))
                ) : (
                    <p className="search-catalog-message">Няма намерени предмети.</p>
                )}
            </div>
        </div>
    );
};

export default SearchCatalog;
