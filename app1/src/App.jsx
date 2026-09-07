import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/Home/Home';
import Signin from './Pages/Signin/Signin';
import Profile from './Pages/Profile/Profile';
import Layout from './Layout/Layout';
import Signup from './Pages/Signup/Signup';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';
import ProtectAuth from './Components/ProtectAuth/ProtectAuth';
import PostDetails from './Pages/PostDetails/PostDetails';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [

        {
          index: true,
          element: <ProtectAuth> <Signup /> </ProtectAuth>
        },

        {
          path: "/signin",
          element: <ProtectAuth> <Signin /></ProtectAuth>
        },

        {
          path: "/home",
          element: <ProtectRoute> <Home /> </ProtectRoute>
        },
        {
          path: "/postdetails/:id",
          element: <PostDetails />
        },

        {
          path: "/profile",
          element: <ProtectRoute> <Profile /></ProtectRoute>
        },
        {
          path: '/change-password',
          element: <ProtectRoute> <ChangePassword /></ProtectRoute>
        }

      ]
    }
  ])

  return <>
    <RouterProvider router={router} />
    <ToastContainer />

  </>
}

export default App