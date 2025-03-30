import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/AddItem.css"; // Импортираме CSS файла

const AddItem = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !imageUrl || !category) {
            alert("Моля, попълнете всички полета!");
            return;
        }

        if (!user) {
            alert("Не сте влезли в системата!");
            return;
        }

        try {
            await addDoc(collection(db, "magicItems"), {
                name,
                description,
                imageUrl,
                category,
                createdBy: user.uid,
                createdByName: user.displayName || "Анонимен", // Ако няма име, показваме "Анонимен"
                createdAt: serverTimestamp(),
            });
            navigate("/catalog");
        } catch (err) {
            console.error("Грешка при добавяне:", err);
        }
    };

    return (
        <div className="add-item-container">
            <form onSubmit={handleSubmit} className="add-item-form">
                <h2 className="add-item-title">Добави нов вълшебен предмет</h2>
                <input
                    type="text"
                    placeholder="Име на предмета"
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                    type="text"
                    placeholder="URL към снимка"
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <select onChange={(e) => setCategory(e.target.value)} defaultValue="">
                    <option value="" disabled>Избери категория</option>
                    <option value="Артефакт">Артефакт</option>
                    <option value="Отвара">Отвара</option>
                    <option value="Книга">Книга</option>
                    <option value="Магически инструмент">Магически инструмент</option>
                </select>
                <button type="submit" className="add-item-button">Добави предмет</button>
            </form>
        </div>
    );
};

export default AddItem;
