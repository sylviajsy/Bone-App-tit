import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import PlacesMap from './components/PlacesMap';
import PostDetailPage from './components/PostDetailPage';
import { useEffect } from 'react';

function App() {
  const [places, setPlaces] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

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

  const handleOpenPost = (post) => {
    setSelectedPost(post);
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

      <PlacesMap places={places} posts={posts} handleOpenPost={handleOpenPost}/>
      {selectedPost && <PostDetailPage posts={posts} handleClosePost={handleClosePost}/>}
    </>
  )
}

export default App
