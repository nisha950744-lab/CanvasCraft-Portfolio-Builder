/*import { createContext,useContext,useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebaseConfig"

const FirebaseContext=createContext(null);

export const useFirebase=()=> {
    return useContext(FirebaseContext);
}
export const FirebaseProvider=({children})=>{
    const [user,setUser]=useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
           //setUser(`${user} ?${user}:null`);
           if(user) setUser(user);
           else setUser(null);
        })
    },[])

    const isLoggedIn=user? true:false;

    return <FirebaseContext.Provider value={isLoggedIn}>
        {children}
    </FirebaseContext.Provider>
}*/


// FirebaseContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); 
  // undefined = still checking, null = not logged in

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return unsub;
  }, []);

  const isLoggedIn = !!user;

  const value = { user, isLoggedIn };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
