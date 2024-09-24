import React, { useEffect, useState } from 'react';
import { fetchCategoryPlaylists } from '../api/getApi';
import { useParams } from 'react-router-dom';
import ListPlayLists from '../Specific.jsx/Home/ListPlayLists';
import Div from '../components/Div';

const Categories = () => {
  const { categoryId } = useParams(); // Destructure categoryId from URL parameters
  const [playlists, setPlaylists] = useState([]); // State for playlists based on selected category
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch playlists when categoryId changes
  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const playlistsData = await fetchCategoryPlaylists(categoryId); // Fetch playlists for the selected category
        setPlaylists(playlistsData.playlists.items || []); // Set playlists state
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setError('Error fetching playlists');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchPlaylists(); // Call the function to fetch playlists
    }
  }, [categoryId]); // Run when categoryId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Div>
      
      {playlists.length > 0 ? (
        <Div className="playlists-list grid gap-2 p-5  grid-cols-4">
          {playlists.map((playlist, index) => (
           <ListPlayLists key={index} playlist={playlist}/>
          ))}
        </Div>
      ) : (
        <p>No playlists found for this category.</p>
      )}
    </Div>
  );
};

export default Categories;
