import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuthContext } from "../contexts/AuthContext";
import config from "../config";
import "../styles/EditItem.css";

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            const docRef = doc(db, "magicItems", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const itemData = docSnap.data();
                if (itemData.createdBy !== user.uid) {
                    alert(config.NO_PERMISSION_TO_EDIT);
                    navigate("/catalog");
                    return;
                }
                setName(itemData.name);
                setDescription(itemData.description);
                setImageUrl(itemData.imageUrl);
                setCategory(itemData.category);
            } else {
                alert(config.ITEM_NOT_FOUND);
                navigate("/catalog");
            }
            setLoading(false);
        };

        fetchItem();
    }, [id, navigate, user]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!name || !description || !imageUrl || !category) {
            alert(config.FILL_OUT_FIELDS_WARNING);
            return;
        }

        try {
            await updateDoc(doc(db, "magicItems", id), {
                name,
                description,
                imageUrl,
                category,
            });
            alert(config.EDIT_ITEM_SUCCESS);
            navigate(`/item/${id}`);
        } catch (error) {
            console.error("Грешка при обновяване:", error);
        }
    };

    if (loading) return <p className="loading-text">Зареждане...</p>;

    return (
        <div className="edit-item-container">
            <form onSubmit={handleUpdate} className="edit-item-form">
                <h2 className="edit-item-title">Редактирай предмет</h2>
                <input
                    type="text"
                    placeholder="Име на предмета"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                    type="text"
                    placeholder="URL към снимка"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>Избери категория</option>
                    <option value="Артефакт">Артефакт</option>
                    <option value="Отвара">Отвара</option>
                    <option value="Книга">Книга</option>
                    <option value="Магически инструмент">Магически инструмент</option>
                </select>
                <button type="submit" className="edit-item-button">Запази</button>
            </form>
        </div>
    );
};

export default EditItem;
