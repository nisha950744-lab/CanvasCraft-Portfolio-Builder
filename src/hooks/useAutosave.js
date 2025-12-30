// hooks/useAutosave.js
/*import { useEffect, useCallback, useRef,useMemo } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import debounce from "lodash.debounce";
import { db } from "../firebase/firebaseConfig"; 

export function useAutosave(blocks, projectId, user) {
  const saveTimeout = useRef();

  const autosave = useCallback(
    debounce(async (currentBlocks) => {

        if (!user || !projectId) return;   // allow empty blocks array
      //if (!user || !projectId || !currentBlocks?.length) return;

      try {
        const ref = doc(db, "users", user.uid, "projects", projectId);
        await updateDoc(ref, {
          blocks: currentBlocks,
          updatedAt: serverTimestamp(),
          status: "draft",
        });
        console.log("✅ Autosaved", currentBlocks.length || 0, "blocks");
      } catch (error) {
        console.error("Autosave failed:", error);
      }
    }, 2000), // 2 second delay after last change
    [user, projectId]
  );

  useEffect(() => {
    autosave(blocks);
    return () => {
      autosave.cancel();
    };
  }, [blocks, autosave]);

  return autosave;
}*/


// hooks/useAutosave.js
import { useEffect, useMemo } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import debounce from "lodash.debounce";
import { db } from "../firebase/firebaseConfig";

export function useAutosave(blocks, projectId, user) {
  const debouncedSave = useMemo(
    () =>
      debounce(async (currentBlocks) => {
        if (!user || !user.uid || !projectId){
            console.log("⛔ Skip autosave (no user or projectId)",{
            user,
            projectId,
          });
            return;
        } ;

        try {
          console.log("💾 Saving blocks to", user.uid, projectId, currentBlocks);
          const ref = doc(db, "users", user.uid, "projects", projectId);
          await updateDoc(ref, {
            blocks: currentBlocks ?? [],
            updatedAt: serverTimestamp(),
            status: "draft",
          });
          console.log("✅ Autosaved", currentBlocks?.length || 0, "blocks");
        } catch (error) {
          console.error("Autosave failed:", error);
        }
      }, 2000),
    [user, projectId]
  );

  useEffect(() => {
    debouncedSave(blocks);
    return () => debouncedSave.cancel();
  }, [blocks, debouncedSave]);

  return debouncedSave;
}
