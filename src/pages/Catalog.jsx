import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/Catalog.css"; // Импортираме стиловете

const CategorySidebar = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const snapshot = await getDocs(collection(db, "magicItems"));
            const categoriesSet = new Set();
            snapshot.docs.forEach((doc) => categoriesSet.add(doc.data().category));
            setCategories(Array.from(categoriesSet));
        };
        fetchCategories();
    }, []);

    return (
        <div className="category-sidebar">
            <h2>Категории</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category}>
                        <button onClick={() => onCategorySelect(category)}>
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CategoryItems = ({ selectedCategory }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            let q;
            if (selectedCategory) {
                q = query(
                    collection(db, "magicItems"),
                    where("category", "==", selectedCategory),
                    orderBy("createdAt", "desc"),
                    limit(3)
                );
            } else {
                q = query(collection(db, "magicItems"), orderBy("createdAt", "desc"), limit(3));
            }

            const snapshot = await getDocs(q);
            setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };

        fetchItems();
    }, [selectedCategory]);

    return (
        <div className="category-items">
            <h2>Последни предмети</h2>
            <div className="items-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="item-card">
                            <img src={item.imageUrl} alt={item.name} />
                            <h3>{item.name}</h3>
                            <Link to={`/item/${item.id}`} className="details-button">
                                Детайли
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Няма намерени предмети.</p>
                )}
            </div>
        </div>
    );
};

const CategoryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <div className="category-container">
            <CategorySidebar onCategorySelect={setSelectedCategory} />
            <CategoryItems selectedCategory={selectedCategory} />
        </div>
    );
};

export default CategoryPage;
