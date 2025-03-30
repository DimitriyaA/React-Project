import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const ProfilePage = () => {
    const { user } = useAuthContext();
    const [items, setItems] = useState([]);
    const [spells, setSpells] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchUserData = async () => {
            try {
                console.log("Логнат потребител: ", user.uid);

                // Запитване за магическите предмети с UID на потребителя
                const itemsQuery = query(collection(db, "magicItems"), where("createdBy", "==", user.uid));
                const itemsSnapshot = await getDocs(itemsQuery);
                console.log("Заявка за магически предмети:", itemsQuery);
                console.log("Резултати за магически предмети:", itemsSnapshot.docs.map(doc => doc.data()));
                setItems(itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                // Запитване за магиите с името на потребителя
                const spellsQuery = query(collection(db, "spells"), where("createdBy", "==", user.displayName));
                const spellsSnapshot = await getDocs(spellsQuery);
                console.log("Заявка за магии:", spellsQuery);
                console.log("Резултати за магии:", spellsSnapshot.docs.map(doc => doc.data()));
                setSpells(spellsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                // Запитване за локациите с името на потребителя
                const locationsQuery = query(collection(db, "locations"), where("createdBy", "==", user.displayName));  // Използване на user.displayName
                const locationsSnapshot = await getDocs(locationsQuery);
                console.log("Заявка за локации:", locationsQuery);
                console.log("Резултати за локации:", locationsSnapshot.docs.map(doc => doc.data()));
                setLocations(locationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Грешка при зареждане на данните.", error);
            }
        };

        fetchUserData();
    }, [user]);

    if (!user) {
        return <p className="text-center text-gray-400">🔒 Трябва да бъдете регистриран потребител, за да виждате профила си.</p>;
    }

    return (
        <div className="profile-container p-6">
            <h1 className="text-4xl text-yellow-300">🔮 Профилът на {user.displayName || user.email}</h1>

            <section className="profile-section">
                <h2 className="text-2xl">🧙‍♂️ Моите магически предмети</h2>
                {items.length > 0 ? (
                    <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>
                ) : (<p>Няма намерени магически предмети.</p>)}
            </section>

            <section className="profile-section">
                <h2 className="text-2xl">📜 Моите магии</h2>
                {spells.length > 0 ? (
                    <ul>{spells.map(spell => <li key={spell.id}>{spell.name}</li>)}</ul>
                ) : (<p>Няма намерени магии.</p>)}
            </section>

            <section className="profile-section">
                <h2 className="text-2xl">📍 Моите магьоснически локации</h2>
                {locations.length > 0 ? (
                    <ul>{locations.map(loc => (
                        <li key={loc.id}>
                            {loc.name}
                        </li>
                    ))}</ul>
                ) : (<p>Не са намерени магьоснически локации.</p>)}
            </section>
        </div>
    );
};

export default ProfilePage;
