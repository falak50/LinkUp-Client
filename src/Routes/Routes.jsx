import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Profile from "../pages/Profile/Profile/Profile";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Settings from "../pages/Settings/Settings";
import MyNetwork from "../pages/MyNetwork/MyNetwork";
import Messaging from "../pages/Messaging/Messaging";
import MessagingCom from "../pages/Messaging/MessagingCom";
import Joblist from "../pages/Job/Joblist";
import Notifications from "../pages/Notifications/Notifications";

// Routes configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "profile/:email",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "profile/education/:email",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "mynetwork",
        element: (
          <PrivateRoute>
            <MyNetwork></MyNetwork>
          </PrivateRoute>
        ),
      },
      {
        path: "job",
        element: <Joblist></Joblist>,
      },
      {
        path: "notifications",
        element: <Notifications></Notifications>,
      },
      {
        path: "messaging",
        element: <MessagingCom></MessagingCom>,
      },
      {
        path: "messaging1",
        element: <Messaging></Messaging>,
      },
      {
        path: "settings",
        element: <Settings></Settings>,
      },
    ],
  },
  // Separate routes for login and signup (outside of Main layout)
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
]);
