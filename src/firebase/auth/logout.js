import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";

const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect after logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };  

