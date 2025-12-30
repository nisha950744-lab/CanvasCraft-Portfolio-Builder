import React from "react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './index.css'
import Login from "./pages/login";
import Signup from "./pages/signup"; 
import CanvasPage from "./pages/canvasPage"; 
import Dashboard from "./pages/dashboard";
import UserContextProvider from "./context/UserContextProvider";
import { FirebaseProvider } from "./firebase/context/firebase";



function App() {
  return (
    <FirebaseProvider>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route
            path="/canvas/:portfolioId"
            element={
              <DndProvider backend={HTML5Backend}>
                <CanvasPage />
              </DndProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
    </FirebaseProvider>
  );
}

export default App;