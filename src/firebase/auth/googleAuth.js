import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

const provider = new GoogleAuthProvider();

export function googleAuth() {
  return signInWithPopup(auth, provider); // same for "sign in" or "login"
}
