import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import PlacesMap from './components/PlacesMap';
import PostDetailPage from './components/PostDetailPage';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import { useEffect } from 'react';
import './App.scss';

function App() {
  const [places, setPlaces] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    loadPlaces();
    loadPosts();
  },[])

  const loadPlaces = async () => {
    try {
      const res = await fetch('/api/places');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch places');
      }

      setPlaces(data);
      console.log('Places', data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const loadPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch posts');
      }

      setPosts(data);
      console.log('Posts', data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }  
  } 

  const handleOpenPost = async(postId) => {
    try {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to fetch post');
        }

        setSelectedPost(data);
        console.log('Post', data);
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }  
  }

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  const onSubmit = async (formData) => {
    if (formData.pet_friendly_rating < 1 || formData.pet_friendly_rating > 5) {
        return toast.error("Rating must be between 1 and 5");
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      toast.success('Post added successfully! 🐾');
      loadPosts();
      loadPlaces();
      setShowModal(false);
    }catch (error) {
        console.error(error);
        toast.error(error.message);
    }
  }

  const fetchAiSummary = async (placeId) => {
    setAiSummary(placeId);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/ai/summarize/${placeId}`);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to feth AI summary');
      }

      const data = await res.json();
      setAiSummary(data.summary);
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    } finally {
      setIsLoading(null);
    }
  }

  return (
    <>
      <ToastContainer 
            position="top-center"
            autoClose={3000}
            toastStyle={{
              marginTop: "40vh",
              textAlign: "center"
            }}
        />

      <div className="app-shell">
            <button
              className="toggle-list-btn"
              onClick={() => setShowList((prev) => !prev)}
            >
              {showList ? 'Hide List' : 'Show List'}
            </button>

            <button
              className="add-post-btn" 
              onClick={() => setShowModal(true)}
            >
              + Add Review
            </button>

            <div className="map-background">
              <PlacesMap places={places} posts={posts} handleOpenPost={handleOpenPost} fetchAiSummary={fetchAiSummary} aiSummary={aiSummary} isAiLoading={isLoading}/>
            </div>

            <div className={`list-drawer ${showList ? 'open' : ''}`}>
              <PostList posts={posts} handleOpenPost={handleOpenPost} />
            </div>
      </div>

      {selectedPost && <PostDetailPage selectedPost={selectedPost} handleClosePost={handleClosePost}/>}
      {showModal && <PostForm onClose={() => setShowModal(false)} onSubmit={onSubmit}/>}
    </>
  )
}

export default App
