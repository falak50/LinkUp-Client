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
import MessagingPage from "../pages/Messaging/MessagingPage";
import MessagingCom from "../pages/Messaging/MessagingCom";
import Job from "../pages/Job/Job";
import Joblist from "../pages/Job/Joblist";
import JobBoard from "../not_includes/JobBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      // {
      //     path:'profile',
      //     element:<PrivateRoute><Profile></Profile></PrivateRoute>
      // },
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
        // element:<Job></Job>
      },
      {
        path: "messaging",
        element: <MessagingCom></MessagingCom>,
        // element:<MessagingPage></MessagingPage>
      },
      {
        path: "messaging1",
        element: <Messaging></Messaging>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "settings",
        element: <Settings></Settings>,
      },
    ],
  },
]);
