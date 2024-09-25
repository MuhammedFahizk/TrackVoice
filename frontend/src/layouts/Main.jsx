import React from "react";
import Div from "../components/Div";
import { TopHeader } from "../Specific.jsx/Header/TopHeader";
import SearchBar from "../Specific.jsx/Header/SearchBar";
import ListMusics from "../Specific.jsx/Home/ListMusics";
import { Outlet } from "react-router-dom";
import RightDiv from "../Specific.jsx/Right/RightDiv";

const Main = () => {
  return (
    <Div className="bg-gradient-to-b grid grid-cols-4 from-bg to-bgblack w-full ">
     <Div className={'col-span-3'}>
     <div className="flex justify-between   mx-20  my-5">
        <TopHeader />
        <SearchBar />
      </div>
    <Outlet/>
     </Div>
     <RightDiv/>
    </Div>
  );
};

export default Main;
