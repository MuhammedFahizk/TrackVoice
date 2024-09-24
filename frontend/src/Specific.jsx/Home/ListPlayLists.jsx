import React from "react";
import Div from "../../components/Div";
import { Link } from "react-router-dom";

const ListPlayLists = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`}>
      <Div className="music-item cursor-pointer p-1 bg-white rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300">
        <img src={playlist.images[0]?.url} alt={playlist.name} />
        <p>{playlist.name}</p>
      </Div>
    </Link>
  );
};

export default ListPlayLists;
