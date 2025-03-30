import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AddLocation = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    if (!user) {
        return (
            <div className="p-6 text-red-500 text-center">
                <h2 className="text-2xl font-bold">Достъпът е отказан</h2>
                <p>Само регистрирани потребители могат да добавят локации.</p>
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
        <div className="p-6">
            <h1 className="text-2xl mb-4">Добави нова локация</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Име на локацията"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full"
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Географска ширина (lat)"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="border p-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Географска дължина (lng)"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="border p-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Добави локация
                </button>
            </form>
        </div>
    );
};

export default AddLocation;
