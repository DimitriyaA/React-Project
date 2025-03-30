import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/Catalog.css";

const CategorySidebar = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snapshot = await getDocs(collection(db, "magicItems"));
                const categoriesSet = new Set();
                snapshot.docs.forEach((doc) => {
                    categoriesSet.add(doc.data().category);
                });
                setCategories(Array.from(categoriesSet));
                console.log("Категории заредени:", Array.from(categoriesSet));
            } catch (error) {
                console.error("Грешка при зареждане на категориите:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="category-sidebar">
            <h2>Категории</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category}>
                        <button onClick={() => navigate(`/catalog/${category}`)}>
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CategoryItems = () => {
    const { category } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log("Зареждане на предмети за категория:", category);
                let q;
                if (category) {
                    q = query(
                        collection(db, "magicItems"),
                        where("category", "==", category),
                        orderBy("createdAt", "desc"),
                        limit(3)
                    );
                } else {
                    q = query(
                        collection(db, "magicItems"),
                        orderBy("createdAt", "desc"),
                        limit(3)
                    );
                }

                const snapshot = await getDocs(q);
                const fetchedItems = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log("Намерени предмети:", fetchedItems);
                setItems(fetchedItems);
            } catch (error) {
                console.error("Грешка при зареждане на предметите:", error);
            }
        };

        fetchItems();
    }, [category]);

    return (
        <div className="category-items">
            <h2>
                {category ? `Последни предмети от "${category}"` : "Последни предмети"}
            </h2>
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
    return (
        <div className="category-container">
            <CategorySidebar />
            <CategoryItems />
        </div>
    );
};

export default CategoryPage;
