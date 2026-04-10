import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './PostForm.scss';

const PostForm = ({ onClose, onSubmit, userLocation }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        content: '',
        pet_friendly_rating: '',
        category_id: '',
        place_name: '',
        address: '',
        latitude: '',
        longitude: '',
    });
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isPolishing, setIsPolishing] = useState(false);

    useEffect(() => {
        loadCategories();
    },[]);

    useEffect(() => {
        if (!searchInput || searchInput.trim().length === 0) {
            setSuggestions([]);
            return; 
        }

        if (searchInput === formData.place_name) {
            return;
        }
        
        const debounceTimer = setTimeout(async() => {
            try {
                let url = `/api/geocode/autocomplete?text=${encodeURIComponent(searchInput)}`;

                if (userLocation) {
                    const [lat, lon] = userLocation;
                    url += `&lat=${lat}&lon=${lon}`;
                }

                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Failed to auto complete');
                }

                setSuggestions(data);
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    },[searchInput]);

    const loadCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch categories');
            }

            setCategories(data);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectSuggestion = (place) => {
        setSearchInput(place.name || place.address);

        setFormData((prev) => ({
            ...prev,
            place_name: place.name || place.address,
            address: place.address || '',
            latitude: place.lat || '',
            longitude: place.lon || '',
        }));

        setSuggestions([]);
    }

    const handlePolish = async () => {
        if (!formData.content) return;
        setIsPolishing(true);

        try {
            const response = await fetch('/api/ai/polish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: formData.content }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'AI is chasing a squirrel, try again!');
            }

            if (data.polishedContent){
                setFormData(prev => ({
                    ...prev,
                    content: data.polishedContent
                }));
            } 

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsPolishing(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        clearForm();
    };

    const clearForm = () => {
        setFormData({ 
            title: '',
            author: '',
            content: '',
            pet_friendly_rating: '',
            category_id: '',
            place_name: '',
            address: '',
            latitude: '',
            longitude: ''
        });
    };

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content add-post-modal">
            <button className="modal-close-btn" onClick={onClose}>
                ×
            </button>

            <h2 className="modal-title">Add New Post</h2>
            
            <form className="add-post-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="place_name"
                    placeholder="Place name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                {suggestions.length>0 && (
                    <div className="suggestions-dropdown">
                        {suggestions.map((place, index) => (
                            <button
                                type="button"
                                key={index}
                                className="suggestion-item"
                                onClick={() => handleSelectSuggestion(place)}
                            >
                                <p>{place.name}</p>
                                <span>{place.address}</span>
                            </button>
                        ))}
                    </div>
                )}

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    readOnly
                />

                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                >
                    <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                </select>

                <input
                    type="text"
                    name="title"
                    placeholder="Post title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                />

                <textarea
                    name="content"
                    placeholder="Write your review..."
                    value={formData.content}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="pet_friendly_rating"
                    min="1"
                    max="5"
                    placeholder="Rating (1-5)"
                    value={formData.pet_friendly_rating}
                    onChange={handleChange}
                />

                <button
                    type="button" 
                    className="polish-btn"
                    onClick={handlePolish}>
                    {isPolishing ? "✨ Paw-lease wait...Magic in progress..." : "✨ Polish with AI"}
                </button>

                <button type="submit">
                    Add
                </button>
            </form>
        </div>
    </div>
  )
}

export default PostForm
