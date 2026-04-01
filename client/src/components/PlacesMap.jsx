import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const PlacesMap = ({ places }) => {
    // Center US
    const defaultCenter = [39.8283, -98.5795]; 

  return (
    <MapContainer
        center={defaultCenter}
        zoom={4}
        style={{ height: '600px', width: '100%' }}
    >
        <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place) => (
            <Marker
                key={place.id}
                position={[Number(place.latitude), Number(place.longitude)]}>
                    <Popup>
                        <div>
                        <h3>{place.name}</h3>
                        <p>{place.category}</p>
                        <p>{place.address}</p>
                        </div>
                    </Popup>
            </Marker>
        ))}
    
    </MapContainer>
  )
}

export default PlacesMap
