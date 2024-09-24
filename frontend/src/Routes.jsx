import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRouteUser from './Utils/ProtectedRout';
import ListMusics from './Specific.jsx/Home/ListMusics';
import Categories from './pages/Categories';
import PlayLists from './pages/PlayLists';

export const Routes = createBrowserRouter([ // Keep the named export
  {
    path: "/",
    element: <ProtectedRouteUser />,
    children: [
      {
        path: "",
        element: <ListMusics />,
      },
      {
        path: "category/:categoryId", // Dynamic route for category selection
        element: <Categories />, // Component to display musics of selected category
      },
      {
        path: "playlist/:playlistId", // Dynamic route for category selection
        element: <PlayLists />, // Component to display musics of selected category
      },
    ],
  },  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);
