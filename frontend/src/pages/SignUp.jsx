import React, {  useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../api/api";
import { UserContext } from "../context/userContext";

const SignUp = () => {
    let {state,dispatch} = useContext(UserContext);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const navigator = useNavigate();


        const register = async(e)=>{
            try{

                e.preventDefault();
                const data = {name,email,password};
                const store = await api.post("/api/users/register",data,{withCredentials:true});
                if( store.status == 200){
                   console.log(store)
                    dispatch({type : "LOGIN",payload : store.data.data})
                    navigator("/")
                }

            }catch(err){
                // console.log(err.response.data.error)
                setError(err.response.data.error);
            }
        }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={register}
            className="space-y-6 bg-white shadow-md rounded-sm p-8"
          >
            <h1 className="text-2xl text-center font-bold">Register Form</h1>
      
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-black-100"
              >
                Name
              </label>
              <div className="mt-2">
                <input

                  type="text"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  placeholder="Enter name..."
                  autoComplete="email"
                  className="shadow-sm border border-green-600 rounded w-full p-2 focus:outline-none text-gray-600"
                />
                {!!error && ( <p className="text-red-500 mt-1 "> {error.name.msg} </p>)}

              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-black-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input

                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="sample@gmail.com"
                  autoComplete="email"
                  className="shadow-sm border border-green-600 rounded w-full p-2 focus:outline-none text-gray-600"
                />

                 {!!error && ( <p className="text-red-500 mt-1 "> {error.email.msg} </p>)}

              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-black-100"
                >
                  Password
                </label>
                {/* <div className="text-sm">
          <a
            href="#"
            className="font-semibold text-green-400 hover:text-green-300"
          >
            Forgot password?
          </a>
        </div> */}
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  placeholder="xxxxxx"
                  autoComplete="current-password"
                  className="shadow-sm appearance-none border border-green-600 rounded w-full p-2 focus:outline-none text-gray-600"
                />
                {!!error && ( <p className="text-red-500 mt-1 "> {error.password.msg} </p>)}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            You are member?{" "}
            <Link
              to={"/signIn"}
              className="font-semibold text-green-400 hover:text-green-300"
            >
              log in Here!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
