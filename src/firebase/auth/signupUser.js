/*import { firebaseApp } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth,db } from "./firebaseConfig";
import { doc, setDoc,serverTimestamp } from "firebase/firestore";


export default function signupUser(name,email,password){
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        //creating the users collection
        setDoc(doc(db,"users",user.uid),{
            user_id:user.uid,
            username:name,
            email:user.email,
            createdAt: serverTimestamp(),
        }).then(()=>{
            console.log("User doc created");
        }).catch(()=>{
            console.log("user doc wasn't created");
        });
        
        console.log("User created: ",user);
        alert("Sign up successful");
        //window.location.href="http://localhost:5173/dashboard";
    }).catch((error)=>{
        console.log("error occured : ",error);
        throw error;
    })

}*/
import { firebaseApp } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default async function signupUser(name, email, password) {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log("User created: ", user);
    
    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      user_id: user.uid,
      username: name,
      email: user.email,
      createdAt: serverTimestamp(),
    });
    
    console.log("User doc created");
    
    return user;  // Return user for component to use
    
  } catch (error) {
    console.log("Error occurred: ", error);
    throw error;  // Re-throw for component to catch
  }
}
