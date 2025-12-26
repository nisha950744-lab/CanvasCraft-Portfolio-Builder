
import React, { useState,useEffect } from 'react';
import UserContext from './UserContext.js';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


const UserContextProvider = ({children}) => {//{children} refers to any jsx component that is passed inside the provider wrapper
    const [user,setUser]=useState(null);
    

    //onAuthStateChanged-->runs  automatically whenever the user logs in, logs out, or refreshes the page.
    /*useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({...user,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.displayName || firebaseUser.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    },[]);

    return unsubscribe; // cleanup listener
  }, []);*/


    //UserContext.Provider wraps components and shares values with them
    /*user is passed for read only tasks but the setter func is needed for login,logout,updating profile */ 
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;