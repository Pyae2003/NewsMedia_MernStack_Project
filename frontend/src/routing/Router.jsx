import React, { useContext } from 'react'
import { createBrowserRouter, Navigate } from 'react-router'
import App from '../App'
import Home from '../pages/Home'
import CreateNews from '../pages/CreateNews'
import Signin from '../pages/Signin'
import SignUp from '../pages/SignUp'
import { RouterProvider } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Details from '../pages/Details'


const Router = () => {
    let {user} = useContext(UserContext);

 const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "/",
                element : user? <Home/> : <Navigate to={'/signIn'}/>
            },
            {
                path : "/createNew",
                element : user? <CreateNews/> : <Navigate to={'/signIn'}/>
            },
            {
                path : "/updateNews/:id",
                element : <CreateNews/>
            },
            {
                path : "/signIn",
                element : !user? <Signin/> : <Navigate to={'/'}/>
            },
            {
                path : "/signUp",
                element : !user? <SignUp/> : <Navigate to={'/'}/>
            },
            {
                path : "/detailNews/:id",
                element : user? <Details/> : <Navigate to={'signIn'} />
            }
        ]

    }
 ])
    


  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default Router