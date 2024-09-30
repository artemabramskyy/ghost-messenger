import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProtectedRoute from "root/src/client/Router/ProtectedRoute";
import Home from "root/src/client/Pages/Home";
import Auth from "root/src/client/Pages/Auth";
import Chat from "root/src/client/Pages/Chat";
import CreateChat from "root/src/client/Pages/CreateChat";
import Error from "root/src/client/Pages/Error";
import AboutUser from "root/src/client/Pages/AboutUser";
import Layout from "root/src/client/Components/Layout/Layout";

export const routerPaths = {
  home: '/',
  auth: '/auth',
  createChat: '/createChat',
  chat: '/chat',
  aboutUser: '/about-user'
}

const router = createBrowserRouter([{
  path: routerPaths.home,
  element: <Layout/>,
  errorElement: <Error/>,
  children: [
    {
      path: routerPaths.home,
      element: (
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      ),
    },
    {
      path: routerPaths.auth,
      element: (
        <Auth/>
      )
    },
    {
      path: routerPaths.createChat,
      element: (
        <ProtectedRoute>
          <CreateChat/>
        </ProtectedRoute>
      )
    },
    {
      path: routerPaths.chat,
      element: (
        <ProtectedRoute>
          <Chat/>
        </ProtectedRoute>
      )
    },
    {
      path: routerPaths.aboutUser,
      element: (
        <ProtectedRoute>
          <AboutUser/>
        </ProtectedRoute>
      )
    }
  ]
}]);

const AppRouter: React.FC = () => {
  return (
    <RouterProvider router={router}/>
  )
}
export default AppRouter
