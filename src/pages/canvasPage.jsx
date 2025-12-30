// CanvasPage.jsx
import { useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
//import PropertiesPanel from "../components/PropertiesPanel";
import { auth, db } from "../firebase/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { useAutosave } from "../hooks/useAutosave"; // your autosave hook
import { useFirebase } from "../firebase/context/firebase";


export default function CanvasPage() {
    const canvasRef = useRef(null);

  const { portfolioId } = useParams();

  const {user}  =  useFirebase(); 

  const [blocks, setBlocks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // 1) Load blocks from Firestore once
  useEffect(() => {
    if (user === undefined) return;

    if (!user || !portfolioId) {
      setIsLoading(false);
      return;
    }

    const load = async () => {
      try {
        const ref = doc(db, "users", user.uid, "projects", portfolioId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setBlocks(snap.data().blocks || []);
        } else {
          setBlocks([]);
        }
      } catch (e) {
        console.error("Failed to load project", e);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [user, portfolioId]);

  // 2) Autosave whenever blocks change
  useAutosave(blocks, portfolioId, user);
  
  if (isLoading || user === undefined) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        Please log in to edit this project.
      </div>
    );
  }

  // 3) Block helpers used by Canvas + Sidebar
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      x: 40,
      y: 40,
      width: 360,
      height: 220,
      data: {}, // or defaultDataByType[type]
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const updateBlock = (id, patch) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...patch } : b))
    );
  };

  const removeBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  /*if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading…</div>;
  }*/

  return (
    <div className="flex h-screen bg-gradient-to-r from-pink-500/30 to-blue-500/30 w-full">
      <aside className="w-56 md:w-64 border-r border-gray-200 bg-gradient-to-r from-pink-500/30 to-blue-500/30 flex flex-col">
        <Sidebar onBlockAdd={addBlock} />
        <div className="mt-4 border-t border-white/40 pt-3 px-3 pb-3">
           <Toolbar blocks={blocks} projectId={portfolioId} user={user}  canvasRef={canvasRef} />
          

        </div>
      </aside>

      

      <main ref={canvasRef} className="flex-1 bg-slate-50 overflow-auto">
        <Canvas
          blocks={blocks}
          updateBlock={updateBlock}
          removeBlock={removeBlock}
        />
      </main>
    </div>

  );
}


