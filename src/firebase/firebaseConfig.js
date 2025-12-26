import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCYyMac1uJYDYtcEHGB9bnfa_Kpr7YUvE0",
  authDomain: "canvasx-c24a5.firebaseapp.com",
  projectId: "canvasx-c24a5",
  storageBucket: "canvasx-c24a5.firebasestorage.app",
  messagingSenderId: "663760384000",
  appId: "1:663760384000:web:fbfa9f814de9f258e6e8e5"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth=getAuth(firebaseApp);
export const db=getFirestore(firebaseApp);