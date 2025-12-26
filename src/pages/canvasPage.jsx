import Sidebar from "../components/Sidebar.jsx";
import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import PropertiesPanel from "../components/PropertiesPanel";
import { useParams } from "react-router-dom";

export default function CanvasPage() {
    const { portfolioId } = useParams();
  return (
  
    <div className="grid h-screen grid-rows-[56px_1fr_180px] grid-cols-[220px_minmax(0,1fr)] md:grid-cols-[260px_minmax(0,1fr)] bg-gradient-to-r from-pink-500/30 to-blue-500/30 w-full">
     
      <aside className="row-span-3 col-start-1 border-r border-gray-200 bg-gradient-to-r from-pink-500/30 to-blue-500/30">
        <Sidebar />
      </aside>

      
      <header className="col-start-2 row-start-1 border-b border-gray-200 bg-gradient-to-r from-pink-500/30 to-blue-500/30">
        <Toolbar />
      </header>

      
      <main className="col-start-2 row-start-2 relative bg-slate-50 overflow-auto">
       <Canvas onBlockDropped={() => setIsPropsOpen(true)} />
      </main>

      
      <footer className="col-start-2 row-start-3 border-t border-gray-200 bg-gradient-to-r from-pink-500/30 to-blue-500/30">
        <PropertiesPanel />
      </footer>
    </div>
  );
}

