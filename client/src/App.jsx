import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import PlacesMap from './components/PlacesMap';
import PostDetailPage from './components/PostDetailPage';
import PostList from './components/PostList';
import { useEffect } from 'react';
import './App.scss';

function App() {
  const [places, setPlaces] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showList, setShowList] = useState(false);

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

            <div className="map-background">
              <PlacesMap places={places} posts={posts} handleOpenPost={handleOpenPost}/>
            </div>

            <div className={`list-drawer ${showList ? 'open' : ''}`}>
              <PostList posts={posts} handleOpenPost={handleOpenPost} />
            </div>
      </div>

      {selectedPost && <PostDetailPage selectedPost={selectedPost} handleClosePost={handleClosePost}/>}
    </>
  )
}

export default App
