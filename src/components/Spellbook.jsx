import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuthContext } from "../contexts/AuthContext";
import config from "../config";
import "../styles/Spellbook.css";

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
        if (newSpell.name.trim() === "" || newSpell.description.trim() === "") {
            alert(config.FILL_OUT_FIELDS_WARNING);
            return;
        }

        await addDoc(spellsRef, {
            name: newSpell.name,
            description: newSpell.description,
            createdBy: user?.displayName || "Anonymous",
            createdAt: new Date()
        });

        alert(config.ADD_SPELL_SUCCESS); // Използване на съобщение от конфигурацията
        setNewSpell({ name: "", description: "" });
        getSpells();
    };

    useEffect(() => {
        getSpells();
    }, []);

    return (
        <div className="spellbook-container">
            <h1 className="spellbook-title">📜 Магьосническа книга на магиите</h1>

            {user ? (
                <div className="spellbook-form-container">
                    <input
                        type="text"
                        value={newSpell.name}
                        onChange={(e) => setNewSpell({ ...newSpell, name: e.target.value })}
                        className="spellbook-input"
                        placeholder="Име на магията..."
                    />
                    <textarea
                        value={newSpell.description}
                        onChange={(e) => setNewSpell({ ...newSpell, description: e.target.value })}
                        className="spellbook-textarea"
                        placeholder="Описание на магията..."
                        rows="3"
                    />
                    <button
                        onClick={addSpell}
                        className="spellbook-button"
                    >
                        Добавете магия
                    </button>
                </div>
            ) : (
                <p className="spellbook-message">{config.ACCESS_DENIED_SPELLBOOK}</p>
            )}

            <ul className="spellbook-list">
                {spells.map(spell => (
                    <li key={spell.id} className="spellbook-item">
                        <h3 className="spellbook-item-title">{spell.name}</h3>
                        <p className="spellbook-item-description">{spell.description}</p>
                        <p className="spellbook-item-footer">🧙‍♂️ Създадено от: {spell.createdBy}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Spellbook;
