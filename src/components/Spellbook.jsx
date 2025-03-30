import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuthContext } from "../contexts/AuthContext";

const Spellbook = () => {
    const { user } = useAuthContext();
    const [spells, setSpells] = useState([]);
    const [newSpell, setNewSpell] = useState({ name: "", description: "" });

    const spellsRef = collection(db, "spells");

    const getSpells = async () => {
        const data = await getDocs(spellsRef);
        setSpells(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    const addSpell = async () => {
        if (newSpell.name.trim() === "" || newSpell.description.trim() === "") return;
        await addDoc(spellsRef, {
            name: newSpell.name,
            description: newSpell.description,
            createdBy: user?.displayName || "Anonymous",  // Използваме user.displayName вместо user.email
            createdAt: new Date()
        });
        setNewSpell({ name: "", description: "" });
        getSpells();
    };

    useEffect(() => {
        getSpells();
    }, []);

    return (
        <div className="bg-[#201c3b] p-6 rounded-xl shadow-xl border border-purple-800">
            <h1 className="text-2xl font-bold text-yellow-300 text-center mb-4">📜  Магьосническа книга на магиите</h1>

            {user ? (
                <div className="flex flex-col gap-4 mb-6">
                    <input
                        type="text"
                        value={newSpell.name}
                        onChange={(e) => setNewSpell({ ...newSpell, name: e.target.value })}
                        className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
                        placeholder="Име на магията..."
                    />
                    <textarea
                        value={newSpell.description}
                        onChange={(e) => setNewSpell({ ...newSpell, description: e.target.value })}
                        className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
                        placeholder="Описание на магията..."
                        rows="3"
                    />
                    <button
                        onClick={addSpell}
                        className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded shadow"
                    >
                        Добавете магия
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-400 mb-6">🔒 Трябва да сте регистриран потребител, за да добавяте магии.</p>

            )}


            <ul className="space-y-4">
                {spells.map(spell => (
                    <li key={spell.id} className="bg-gray-800 p-4 rounded border border-gray-600">
                        <h3 className="text-xl font-bold text-yellow-300">{spell.name}</h3>
                        <p className="text-gray-300">{spell.description}</p>
                        <p className="text-sm text-gray-500 mt-2">🧙‍♂️ Създадено от: {spell.createdBy}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Spellbook;