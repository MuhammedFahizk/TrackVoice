import React, { useEffect, useState, useCallback } from 'react';
import Div from '../../components/Div';
import { fetchMusics } from '../../api/getApi';
import Music from './Music';

const ListMusics = () => {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMusics = useCallback(async () => {
    setLoading(true);
    try {
      const musicData = await fetchMusics(); // Fetch the music data
      setMusics(musicData); // Set the fetched data
    } catch (error) {
      console.error('Error fetching music data:', error); // Log full error
      setError('Error fetching music data');
    } finally {
      setLoading(false);
    }
  }, []); // Dependency array remains empty to run only once on mount

  useEffect(() => {
    loadMusics(); // Call the loadMusics function
  }, [loadMusics]); // Add loadMusics to the dependency array

  if (loading) return <Div>Loading...</Div>;
  if (error) return <Div>{error}</Div>;

  return (
    <Div className="overflow-y-auto max-h-[550px]  grid grid-cols-4 gap-1 p-5"> {/* Set a max height */}
      {musics?.categories?.items && musics.categories.items.length > 0 ? (
        musics.categories.items.map((music, index) => (
          <Music key={index} data={music} />
        ))
      ) : (
        <Div>No music found</Div>
      )}
    </Div>
  );
};

export default ListMusics;
