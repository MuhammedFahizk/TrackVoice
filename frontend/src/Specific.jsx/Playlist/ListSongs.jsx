import React from 'react'
import Div from '../../components/Div'
import Song from './Song';

const ListSongs = ({playlists}) => {
  console.log(playlists);
  
  return (
   <Div className={'px-4 p-1 h-[300px]  overflow-y-scroll'}>
       {
        playlists.tracks.items.map((item, index) => (
           <Song key={index} item={item} index={index}/>
        ))
       }
   </Div>
  )
}

export default ListSongs