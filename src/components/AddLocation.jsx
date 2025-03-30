import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/AddLocation.css";

const AddLocation = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    if (!user) {
        return (
            <div className="add-location-container">
                <h2 className="add-location-title text-red-500">Достъпът е отказан</h2>
                <p className="add-location-message">Само регистрирани потребители могат да добавят локации.</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !lat || !lng) {
            alert("Моля, попълнете всички полета!");
            return;
        }

        try {
            await addDoc(collection(db, "locations"), {
                name,
                description,
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                userId: user.uid,
                createdBy: user.displayName,
            });

            setName("");
            setDescription("");
            setLat("");
            setLng("");
            alert("Локацията е добавена успешно!");
            navigate("/map");
        } catch (error) {
            console.error("Грешка при добавяне:", error);
            alert("Възникна грешка. Опитайте отново.");
        }
    };

    return (
        <div className="add-location-container">
            <h1 className="add-location-title">Добави нова локация</h1>
            <form onSubmit={handleSubmit} className="add-location-form">
                <input
                    type="text"
                    placeholder="Име на локацията"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="add-location-input"
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="add-location-textarea"
                />
                <input
                    type="number"
                    placeholder="Географска ширина (lat)"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="add-location-input"
                />
                <input
                    type="number"
                    placeholder="Географска дължина (lng)"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="add-location-input"
                />
                <button type="submit" className="add-location-button">
                    Добави локация
                </button>
            </form>
        </div>
    );
};

export default AddLocation;
