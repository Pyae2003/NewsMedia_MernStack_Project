import { createContext, useEffect, useReducer } from "react";

const UserContext = createContext();

const AuthenticationReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null };
    default:
      state;
  }
  ("");
};
const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthenticationReducer, {
    user: null,
  });

  useEffect(()=>{
     let user = JSON.parse(localStorage.getItem("user"));
     if(user){
        dispatch({type : "LOGIN",payload:user});
     }else{
        dispatch({type : "LOGOUT"})
     }
  },[])

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
