import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const MagicMap = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const querySnapshot = await getDocs(collection(db, "locations"));
            const locationsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLocations(locationsArray);
        };

        fetchLocations();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-4xl mb-4 text-yellow-300">Карта на магьосническите локации</h1>
            <MapContainer center={[54.5, -2.5]} zoom={6} style={{ height: "600px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {locations.map(loc => (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                        <Popup>
                            <strong>{loc.name}</strong><br />{loc.description}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MagicMap;
