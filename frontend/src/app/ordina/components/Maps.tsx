import { MapContainer, TileLayer, Marker, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

interface MapProps {
  position: { lat: number; lng: number };
  points: { lat: number; lng: number }[]; // 4 punti con coppia lat/lng
}

// Definisci l'icona personalizzata
const customMarkerIcon = new L.Icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent: React.FC<MapProps> = ({ position, points }) => {
  // Calcola i vertici del rettangolo
  const latMin = Math.min(...points.map((point) => point.lat));
  const latMax = Math.max(...points.map((point) => point.lat));
  const lngMin = Math.min(...points.map((point) => point.lng));
  const lngMax = Math.max(...points.map((point) => point.lng));

  // Definisci i vertici del rettangolo
  const rectangleBounds: L.LatLngBoundsExpression = [
    [latMin, lngMin],
    [latMax, lngMax],
  ];

  return (
    <MapContainer
      className="rounded-lg h-300"
      style={{ height: "300px", width: "100%" }}
      center={position}
      zoom={16}
      key={position.lat + "," + position.lng} // Rigenera la mappa quando la posizione cambia
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customMarkerIcon} />
      <Rectangle bounds={rectangleBounds} pathOptions={{ color: "blue" }} />
    </MapContainer>
  );
};

export default MapComponent;
