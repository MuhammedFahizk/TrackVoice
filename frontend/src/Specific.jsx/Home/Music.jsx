import React from 'react';
import Div from '../../components/Div';
import { Link } from 'react-router-dom';

const Music = ({ data }) => {
    console.log(data);
    
  return (

    <Div className="music-item  cursor-pointer  p-1 bg-white rounded-lg shadow-lg border border-gray-30 hover:shadow-xl transition-shadow duration-300">
              <Link key={data.id} to={`/category/${data.id}`}>

      <img src={data.icons[0].url} alt={data.name} className="w-full h-auto rounded-t-lg" />
      <p className="mt- text-lg font-semibold text-center">{data.name}</p>
      </Link>
    </Div>
  );
};

export default Music;
