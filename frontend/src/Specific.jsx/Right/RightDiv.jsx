import React from 'react'
import Div from '../../components/Div'
import PlayDiv from './PlayDiv'
import PlaylistIng from './Playlisting'

const RightDiv = () => {
  return (
    <Div className="col-span-1 bg-gradient-to-b from-bgSecondary to-bgblack p-4">
        <PlaylistIng/>
        <PlayDiv/>

     </Div>
  )
}

export default RightDiv