import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PostCard from './PostCard';
import { TypewriterSummary } from './TypewriterSummary';

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

const PlacesMap = ({ places, posts, handleOpenPost, fetchAiSummary, aiSummary, isAiLoading }) => {
    // Center US
    const defaultCenter = [39.8283, -98.5795]; 

    const getPostsForPlace = (placeId) => {
        return posts.filter((post) => post.place_id === placeId);
    };

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

        {places.map((place) => {
            const placePosts = getPostsForPlace(place.id);

            return(
            <Marker
                key={place.id}
                position={[Number(place.latitude), Number(place.longitude)]}>
                    <Popup>
                        <div>
                        <h3>{place.name}</h3>
                        <p>{place.category}</p>
                        <p>{place.address}</p>

                        <div className="ai-section">
                            {isAiLoading ? (
                                <p className="loading-text">🐶 Woof! Sniffing insights...</p>
                            ) : aiSummary ? ( 
                                // aiSummary loaded, typing...
                                <TypewriterSummary placeSummary={aiSummary} />
                            ) : (
                                // Initial: Display button
                                <button 
                                type="button"
                                onClick={(e) => {
                                        e.stopPropagation();
                                        fetchAiSummary(place.id)}}>
                                    ✨ Get AI Summary
                                </button>
                            )}
                        </div>

                        <h4>Posts</h4>
                        {placePosts.length>0 ? (
                            <div className="post-card-container">
                                {placePosts.map((post) =>(
                                    <PostCard 
                                        key={post.id}
                                        post={post}
                                        onClick={() => handleOpenPost(post.id)}
                                    />
                                ))}
                            </div>
                        ):(
                            <p>No posts yet.</p>
                        )}
                        </div>
                    </Popup>
            </Marker>
        )})}
    
    </MapContainer>
  )
}

export default PlacesMap
