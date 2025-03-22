import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MagicMap = () => {
    return (
        <div className="p-6">
            <h1 className="text-4xl mb-4 text-yellow-300">Карта на магьосниците</h1>
            <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: "600px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        Хогуортс <br /> Училище за магия и вълшебство.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MagicMap;
