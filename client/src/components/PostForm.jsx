import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './PostForm.scss';

const PostForm = ({ onClose, onSubmit }) => {
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

    useEffect(() => {
        loadCategories();
    },[]);

    useEffect(() => {
        const debounceTimer = setTimeout(async() => {
            try {
                const res = await fetch(`/api/geocode/autocomplete?text=${searchInput}`);
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

    const 

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
                    value={formData.place_name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
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

                <button type="submit">
                    Add
                </button>
            </form>
        </div>
    </div>
  )
}

export default PostForm
