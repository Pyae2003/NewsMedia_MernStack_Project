import React, { useContext } from 'react'
import { api } from '../api/api';
import { Link, useNavigate } from "react-router";
import { UserContext } from '../context/userContext';


const NavBar = () => {
    let {user,dispatch} = useContext(UserContext);
    

    const navigator = useNavigate();
    let logout = async()=>{
      console.log("keeee")
      const res = await api.post("/api/users/logout");
      if(res.status == 200){
        dispatch({type : "LOGOUT"})
        navigator("/signIn")
      }
      console.log(res)
    }
  return (
    <>
             <nav className="bg-green-800 p-4">
           <div className="flex items-center justify-between mx-auto"> 
             <div className="text-white text-2xl font-semibold px-5">
                <Link to={"/"} className="text-white text-2xl front-semibold px-5"> Code Lab | Media World</Link>
             </div>
             <div className="space-x-6">
                 {
                   !!user && (
                    <>
                      <Link to={"/"} className="text-yellow-50 hover:text-yellow-100" >Home</Link>
                      <Link to={"/createNews"} className="text-yellow-50 hover:text-yellow-100">Create News</Link>
                    </>
                   )
                 }
                {
                    !user &&(
                        <>
                            <Link to={"/signIn"} className="text-yellow-50 hover:text-yellow-100">Login</Link>
                            <Link to={"/signUp"} className="text-yellow-50 hover:text-yellow-100">Register</Link>
                        </>
                    )
                }
                {
                    !!user && (
                        <>
                            <button  className="text-yellow-50 hover:text-yellow-100" onClick={()=>logout()} >Logout</button>

                        </>
                    )
                }

             </div>
           </div>
      </nav>
    </>
  )
}

export default NavBar