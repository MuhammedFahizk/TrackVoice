import React from 'react'
import Div from '../../components/Div'
import Text from '../../components/Text'
import { Link } from 'react-router-dom'

const NavItems = () => {
  return (
    <Div className={ 'flex gap-4 p-2'}>
        <Text className={'font-semibold'}>
            <Link className='hover:text-quaternary' to="/home">Home</Link>
        </Text>
        <Text className={'font-semibold'}>
    <Link to="/home" className='hover:text-quaternary'>Profile</Link>
        </Text>

        <Text className={'font-semibold'}>
    <Link to="/home" className='hover:text-quaternary'>Musics</Link>
        </Text>
    </Div>
  )
}

export default NavItems