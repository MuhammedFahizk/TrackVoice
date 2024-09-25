import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { UserOutlined, SettingOutlined, InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Main from './Main';
import Div from '../components/Div';
import { TopHeader } from '../Specific.jsx/Header/TopHeader';
import Colapsed from '../Specific.jsx/Layout/Colapsed';
import Uncollapsed from '../Specific.jsx/Layout/UnColapsed';

const { Sider } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
     <Div className={'bg-[#0E0E0E] h-screen first-line  '}>
     <Sider
        width={collapsed ? 80 : 240}
        collapsed={collapsed}
        className='h-full'
        style={{
          background: '#0E0E0E',
          transition: 'width 0.3s ease-in-out',
          overflow: 'hidden',
        }}
      >
        <Div className='flex flex-col  justify-between items-center p-2 h-full text-white'>
          <Button type="text" onClick={toggle} className='text-white' style={{ marginBottom: '10px' }}>
            {collapsed ? <MenuUnfoldOutlined className='text-white' /> : <MenuFoldOutlined className='text-white' />}
          </Button>
          {collapsed ? (
            <Colapsed/>
          ) : (
           <Uncollapsed/>
          )}
        </Div>
      </Sider>
     </Div >
     
      <Main />
    </Layout>
  );
};

export default AppLayout;
