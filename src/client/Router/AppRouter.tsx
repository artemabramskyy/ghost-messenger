import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProtectedRoute from "root/src/client/Router/ProtectedRoute";
import Home from "root/src/client/Pages/Home";
import Auth from "root/src/client/Pages/Auth";
import Chat from "root/src/client/Pages/Chat";
import CreateChat from "root/src/client/Pages/CreateChat";
import Error from "root/src/client/Pages/Error";

const router = createBrowserRouter([{
  path: '/',
  // here should be some kind of layout element that will have navbar and a footer
  element: <></>,
  errorElement: <Error/>,
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      ),
    },
    {
      path: '/auth',
      element: (
        <Auth/>
      )
    },
    {
      path: '/create-chat',
      element: (
        <ProtectedRoute>
          <CreateChat/>
        </ProtectedRoute>
      )
    },
    {
      path: '/chat',
      element: (
        <ProtectedRoute>
          <Chat/>
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
