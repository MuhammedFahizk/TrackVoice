import React from 'react'
import Div from '../../components/Div'
import { PlayButton } from '../../components/PlayButton';

const Details = ({playlists}) => {
    console.log(playlists);
    
  return (
   <Div className={'shadow-lg flex p-2 rounded-lg bg-[#310e0e2c]'}>

    <img className='w-40  rounded-xl' src={playlists.images[0].url} alt="" />
    
     <Div className={'p-2 flex flex-col gap-3 mx-3'}>
     <p className='text-white  font-semibold '>{playlists.description}</p>
     <h1 className=' text-2xl  font-bold text-white '>{playlists.name}</h1>
     <PlayButton/>
     </Div>

   </Div>
  )
}

export default Details