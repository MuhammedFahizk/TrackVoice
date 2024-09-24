import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Div from '../../components/Div';

const SearchBar = () => {
  return (
    <Div className="p-2  ">
      <Input
        type="text"
        placeholder="Search..."
        className="text-white  rounded-full bg-transparent w-[350px] placeholder-white"
        suffix={<SearchOutlined className="text-white" />} // Add search icon
        style={{ borderColor: 'white'}}
      />
    </Div>
  );
};

export default SearchBar;
