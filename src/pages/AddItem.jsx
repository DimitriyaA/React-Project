import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !imageUrl || !category) {
            alert("Моля, попълнете всички полета!");
            return;
        }
        try {
            await addDoc(collection(db, "magicItems"), {
                name,
                description,
                imageUrl,
                category,
                createdAt: serverTimestamp(),
            });
            navigate("/catalog");
        } catch (err) {
            console.error("Грешка при добавяне:", err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md text-white">
                <h2 className="text-2xl mb-4 text-yellow-300">Добави нов вълшебен предмет</h2>
                <input
                    type="text"
                    placeholder="Име на предмета"
                    className="w-full p-2 mb-3 text-black rounded"
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    className="w-full p-2 mb-3 text-black rounded"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                    type="text"
                    placeholder="URL към снимка"
                    className="w-full p-2 mb-3 text-black rounded"
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <select
                    className="w-full p-2 mb-3 text-black rounded"
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Избери категория</option>
                    <option value="Артефакт">Артефакт</option>
                    <option value="Отвара">Отвара</option>
                    <option value="Книга">Книга</option>
                    <option value="Магически инструмент">Магически инструмент</option>
                </select>
                <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 p-2 rounded">
                    Добави предмет
                </button>
            </form>
        </div>
    );
};

export default AddItem;
