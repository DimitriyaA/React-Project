import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const AddLocation = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !lat || !lng) {
            alert("Моля, попълнете всички полета!");
            return;
        }

        await addDoc(collection(db, "locations"), {
            name,
            description,
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        });

        setName("");
        setDescription("");
        setLat("");
        setLng("");
        alert("Локацията е добавена успешно!");
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
