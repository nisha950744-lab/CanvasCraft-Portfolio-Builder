import {auth} from "./firebaseConfig.js"
import { signInWithEmailAndPassword } from "firebase/auth"

export default async function loginUser(email,password) {
    try{
        let userCredential=await signInWithEmailAndPassword(auth,email,password);
        alert("user login successful");
    }catch(error){
        alert(`Login failed : ${error}`);
    }
}
