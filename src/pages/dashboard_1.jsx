// src/DashboardMinimal.jsx
import {useState,useEffect} from "react"
import { useParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, doc, onSnapshot } from "firebase/firestore";
import { db,auth } from "../firebase/firebaseConfig";
import { FiFolder, FiPlus,FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
 import { onAuthStateChanged } from "firebase/auth";


export default function DashboardMinimal() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState(null);

  /*useEffect(() => {
     const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }
      if (userId) {
        const userRef = doc(db, 'users', userId);
        const unsubscribe = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        });
        return unsubscribe;
      }
  }, [userId]);*/
 

useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
      return;
    }

    // user is now guaranteed
    const userRef = doc(db, "users", user.uid);

    const unsubscribeUser = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    });

    // cleanup Firestore listener
    return unsubscribeUser;
  });

  // cleanup auth listener
  return unsubscribeAuth;
}, []);

  const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate("/login"); // redirect after logout
      } catch (err) {
        console.error("Logout failed", err);
      }
    };  
  

  const goToProjectList = () => {
    navigate("/projectList");
  };

  const handleNewProject = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login")//  redirect to login
      return;
    }

    try {
      // users/{uid}/projects
      const projectsRef = collection(db, "users", user.uid, "projects");

      const docRef = await addDoc(projectsRef, {
        title: "Untitled professor portfolio",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        // initial empty canvas / blocks config
        blocks: [],
        status: "draft",
      }); // auto‑generated doc ID[web:134][web:143]

      // go to editor for this project
      navigate(`/canvas/${docRef.id}`);
    } catch (err) {
      console.error("Failed to create project", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome 👋
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Manage your portfolio projects from one place.
          </p>
        </div>
        <nav>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg"
            >
            <FiLogOut />
            Logout
            </button>
        </nav>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={goToProjectList}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          >
            <FiFolder />
            My Projects
          </button>

          <button
            onClick={handleNewProject}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white font-semibold shadow-sm hover:opacity-95 transition"
          >
            <FiPlus />
            Create New Project
          </button>

        </div>
      </div>
    </div>
  );
}
