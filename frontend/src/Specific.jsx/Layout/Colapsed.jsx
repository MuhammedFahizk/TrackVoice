import React from 'react';
import { Link } from 'react-router-dom';
import Div from '../../components/Div';
import {
  UserOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  HeartOutlined,
  OrderedListOutlined,
  TeamOutlined // For followers icon
} from '@ant-design/icons';
const animationProps = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { duration: .5 }, 
};
const Collapsed = () => {
  return (
    <Div  animateProps={animationProps} className="flex flex-col justify-between h-full items-center">
      {/* Top Icons */}
      <Div animateProps={animationProps} className="flex flex-col items-center">
        {/* User Profile */}
        <Link to="/profile">
          <UserOutlined style={{ fontSize: '24px', margin: '10px', color: '#ffffff' }} />
        </Link>

       

        {/* Playlists */}
        <Link to="/playlists">
          <OrderedListOutlined style={{ fontSize: '24px', margin: '10px', color: '#ffffff' }} />
        </Link>

        {/* Likes */}
        <Link to="/likes">
          <HeartOutlined style={{ fontSize: '24px', margin: '10px', color: '#ffffff' }} />
        </Link>

        {/* Followers */}
        <Link to="/friends">
          <TeamOutlined style={{ fontSize: '24px', margin: '10px', color: '#ffffff' }} />
        </Link>
      </Div>

      {/* Bottom Icons */}
      <Div className="flex flex-col items-center"         animateProps={animationProps}>
        <Link to="/settings">
          <SettingOutlined style={{ fontSize: '24px', margin: '10px', color: '#ffffff' }} />
        </Link>

        {/* Logout */}
        <Link to="/logout">
          <LogoutOutlined style={{ fontSize: '24px', margin: '10px', color: '#ffffff' }} />
        </Link>
      </Div>
    </Div>
  );
};

export default Collapsed;
