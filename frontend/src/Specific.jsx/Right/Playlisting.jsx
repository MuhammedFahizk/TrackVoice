import React, { useEffect, useState } from "react";
import Div from "../../components/Div";
import { fetchPlaylists } from "../../api/getApi";
import { useSelector } from "react-redux";
import PlayListCard from "./PlayListCard";

const PlaylistIng = () => {
  const {prevPlayLists}= useSelector((state) => state.audio);
console.log(prevPlayLists);

  

  return (
    <Div className={"text-white py-2"}>
      <h1>Playlists</h1>
      { prevPlayLists.length > 0 ? (
        <Div className="playlists-list flex flex-col no-scrollbar  gap-0 h-[180px] overflow-y-auto">
          {prevPlayLists.map((playlist, index) => (
              <PlayListCard key={index}  playlist={playlist} />

          ))}
        </Div>
      ) : (
        <p>No playlists available.</p>
      )}
    </Div>
  );
};

export default PlaylistIng;
