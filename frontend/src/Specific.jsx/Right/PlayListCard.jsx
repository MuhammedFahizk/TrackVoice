import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../../api/getApi';
import Div from '../../components/Div';
import { FaPlay, FaPause, FaTrash } from 'react-icons/fa'; // Import FaTrash for the remove icon
import { addToQueue, removeFromQueue, addPrevPlayLists, removePrevPlayList } from '../../Redux/audioSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const PlayListCard = ({ playlist }) => {
    const [loading, setLoading] = useState(true);
    const [playlists, setPlaylists] = useState(null);
    const [isAddedToQueue, setIsAddedToQueue] = useState(false);
    const dispatch = useDispatch();

    const handleAddToQueue = () => {
        if (!isAddedToQueue) {
            dispatch(addToQueue(playlists.tracks.items)); // Add tracks to queue
            dispatch(addPrevPlayLists(playlists.id)); // Add to previous playlists
            console.log('Added to queue:', playlists.name);
        } else {
           
                dispatch(removeFromQueue(playlists.id)); // Remove playlist from queue
                console.log('Removed from queue:', playlists.name);
            
        }
        setIsAddedToQueue((prev) => !prev); // Toggle state after confirmation
    };

    const handleRemovePrevPlayList = () => {
            dispatch(removePrevPlayList(playlists.id)); // Remove from previous playlists
            console.log('Removed from previous playlists:', playlists.name);
       
    };

    useEffect(() => {
        const getPlaylists = async () => {
            try {
                const data = await fetchPlaylists(playlist);
                setPlaylists(data);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            } finally {
                setLoading(false);
            }
        };

        getPlaylists();
    }, [playlist]);

    if (loading) return <Div>Loading playlists...</Div>
    if (!playlists) return <div>No playlists found.</div>;

    return (
       <Link to={`/playlist/${playlist}`}>
        <Div className={'p-1 rounded-lg flex h-fit items-center'}>
            <img src={playlists.images[0].url} alt={playlists.name} className='w-10 rounded-md' />
            <Div className={'w-44 overflow-hidden px-1'}>
                <h2 className="text-md font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {playlists.name}
                </h2>
                <h2 className="text-sm font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {playlists.description}
                </h2>
            </Div>
            <Div onClick={handleAddToQueue} className="cursor-pointer">
                {isAddedToQueue ? <FaPause /> : <FaPlay />}
            </Div>
            <Div onClick={handleRemovePrevPlayList} className="cursor-pointer ml-2">
                <FaTrash title="Remove from previous playlists" /> {/* Trash icon for removal */}
            </Div>
        </Div></Link>
    );
};

export default PlayListCard;
