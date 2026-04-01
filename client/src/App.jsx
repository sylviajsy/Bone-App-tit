import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import PlacesMap from './components/PlacesMap';
import { useEffect } from 'react';

function App() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    loadPlaces();
  },[])

  const loadPlaces = async () => {
    try {
      const res = await fetch('/api/places');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch places');
      }

      setPlaces(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
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

      <PlacesMap places={places} />
    </>
  )
}

export default App
