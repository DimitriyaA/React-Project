import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
    { name: "King's Cross Station", position: [51.5322, -0.1234], description: "Мястото, където се намира Платформа 9¾." },
    { name: "Leadenhall Market", position: [51.5123, -0.0831], description: "Служи като вход към Диагон-Али в първия филм." },
    { name: "Durham Cathedral", position: [54.7744, -1.5769], description: "Използван за интериорни сцени на Хогуортс." },
    { name: "Gloucester Cathedral", position: [51.8673, -2.2452], description: "Снимани са сцени от коридорите на Хогуортс." },
    { name: "Alnwick Castle", position: [55.4158, -1.7064], description: "Използван за външни сцени на Хогуортс, включително уроците по летене." },
    { name: "London Zoo", position: [51.5353, -0.1534], description: "Мястото, където Хари говори със змията в първия филм." },
    { name: "Millennium Bridge", position: [51.5079, -0.0984], description: "Разрушен от Пожирателите на смъртта в шестия филм." },
    { name: "Lacock Abbey", position: [51.4157, -2.1195], description: "Използван за различни интериорни сцени на Хогуортс." },
    { name: "Glenfinnan Viaduct", position: [56.8713, -5.4311], description: "Мостът, по който минава Хогуортс Експрес." },
    { name: "Piccadilly Circus", position: [51.5101, -0.1340], description: "Мястото, където Хари, Рон и Хърмаяни бягат в седмия филм." },
    { name: "Claremont Square", position: [51.5300, -0.1078], description: "Използван като външен изглед на дома на Сириус Блек." },
    { name: "St. Paul's Cathedral", position: [51.5138, -0.0984], description: "Стълбището в катедралата се появява в петия филм." },
    { name: "Warner Bros. Studio Tour London", position: [51.6907, -0.4180], description: "Турне зад кулисите на филмите за Хари Потър." },
    { name: "Edinburgh Castle", position: [55.9486, -3.1999], description: "Вдъхновение за Хогуортс; Дж. К. Роулинг пише части от книгите в Единбург." },
    { name: "Glencoe", position: [56.6829, -5.1020], description: "Мястото, където е заснета хижата на Хагрид в третия филм." },
    { name: "Goathland Station", position: [54.3981, -0.7247], description: "Използвана като гара Хогсмийд в първия филм." },
    { name: "Australia House", position: [51.5135, -0.1132], description: "Сградата, използвана за интериора на Гринготс." }
];

const MagicMap = () => {
    return (
        <div className="p-6">
            <h1 className="text-4xl mb-4 text-yellow-300">Карта на магьосническите локации</h1>
            <MapContainer center={[54.5, -2.5]} zoom={6} style={{ height: "600px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {locations.map((loc, index) => (
                    <Marker key={index} position={loc.position}>
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
