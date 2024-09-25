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
  TeamOutlined
} from '@ant-design/icons';
const animationProps = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '-90%' },
    transition: { duration: 1 }, 
};
const Uncollapsed = () => {
  return (
    <Div  animateProps={animationProps} className="flex flex-col justify-between h-full w-full text-white p-4">
      {/* Top Section */}
      <Div animateProps={animationProps} className="flex flex-col space-y-6">
        {/* User Profile */}
        <Link to="/profile" className="flex items-center gap-4 w-full">
          <UserOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
          <span className="text-lg">Profile</span>
        </Link>

        {/* Settings */}
        <Link to="/settings" className="flex items-center gap-4 w-full">
          <SettingOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
          <span className="text-lg">Settings</span>
        </Link>

        {/* Playlists */}
        <Link to="/playlists" className="flex items-center gap-4 w-full">
          <OrderedListOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
          <span className="text-lg">Playlists</span>
        </Link>

        {/* Likes */}
        <Link to="/likes" className="flex items-center gap-4 w-full">
          <HeartOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
          <span className="text-lg">Likes</span>
        </Link>

        {/* Followers */}
        <Link to="/friends" className="flex items-center gap-4 w-full">
          <TeamOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
          <span className="text-lg">Friends</span>
        </Link>
      </Div>

      {/* Bottom Section */}
      <Div  animateProps={animationProps} className="flex flex-col space-y-6">
        {/* Info */}
        <Link to="/info" className="flex items-center gap-4 w-full">
          <InfoCircleOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
          <span className="text-lg">Info</span>
        </Link>

        {/* Logout */}
        <Link to="/logout" className="flex items-center gap-4 w-full">
          <LogoutOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
          <span className="text-lg">Logout</span>
        </Link>
      </Div>
    </Div>
  );
};

export default Uncollapsed;
