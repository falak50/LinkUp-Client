import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Profile from "../pages/Profile/Profile/Profile";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Settings from "../pages/Settings/Settings";
import MyNetwork from "../pages/MyNetwork/MyNetwork";


 export const  router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        // {
        //     path:'profile',
        //     element:<PrivateRoute><Profile></Profile></PrivateRoute>
        // },
        {
            path:'profile/:email',
            element:<PrivateRoute><Profile></Profile></PrivateRoute>
        },
        {
          path:'profile/education/:email',
          element:<PrivateRoute><Profile></Profile></PrivateRoute>
          
        },
        {
            path:'mynetwork',
            element:<PrivateRoute><MyNetwork></MyNetwork></PrivateRoute>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'signup',
            element:<SignUp></SignUp>
        },
        {
          path:'settings',
          element:<Settings></Settings>
        }
      ]
    },
  ]);