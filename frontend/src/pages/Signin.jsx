import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../api/api";
import { UserContext } from "../context/userContext";

const Signin = () => {
      let {state,dispatch} = useContext(UserContext);
      const [email,setEmail] = useState('');
      const [password,setPassword] = useState('');
      const [error,setError] = useState('');
      const navigator = useNavigate();

      const login = async(e)=>{
        e.preventDefault();
        try{
          const data = {email,password};
          const res = await api.post("/api/users/login",data,{withCredentials:true});
          if(res.status == 200){
            console.log(res)
            dispatch({type : "LOGIN" , payload : res.data.data})
            navigator("/");
          }
        }catch(err){
          console.log(err.response);
          setError(err.response.data.error);
          
        }

      }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={login}
            className="space-y-6 bg-white shadow-md rounded-sm p-8"
          >
            <h1 className="text-2xl text-center font-bold">Login Form</h1>
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
                  required
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  placeholder="sample@gmail.com"
                  autoComplete="email"
                  className="shadow-sm border border-green-600 rounded w-full p-2 focus:outline-none text-gray-600"
                />
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
                  type="password"
                  placeholder="xxxxxx"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                 className="shadow-sm appearance-none border border-green-600 rounded w-full p-2 focus:outline-none text-gray-600"
                />
                {
                  !!error && (
                    <p className="text-red-500 mt-1"> { error}</p>
                  )
                }
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <Link
              to={"/signUp"}
              className="font-semibold text-green-400 hover:text-green-300"
            >
              Register Here!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
