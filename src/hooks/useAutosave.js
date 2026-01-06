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
  const debouncedSave = useMemo(//useMemo remembers a computed value and only recomputes it when dependencies change,useMemo is keeping the same debounced autosave function across re-renders so the debounce timer is not reset
    () =>
      /*debounce resets the timer everytime changes are made continuously,when changes are stopped,the final state is 
    autosaved after 2 seconds,it takes a function*/
      debounce(async (currentBlocks) => {
        if (!user || !user.uid || !projectId){
            console.log("Skip autosave (no user or projectId)",{
            user,
            projectId,
          });
            return;
        } ;

        try {
          console.log("Saving blocks to", user.uid, projectId, currentBlocks);
          const ref = doc(db, "users", user.uid, "projects", projectId);//getting reference of a particulsr project created by a particular user
          await updateDoc(ref, {//updating the project once a change is made
            blocks: currentBlocks ?? [],
            updatedAt: serverTimestamp(),
            status: "draft",
          });
          console.log("Autosaved", currentBlocks?.length || 0, "blocks");
        } catch (error) {
          console.error("Autosave failed:", error);
        }
      }, 2000),
    [user, projectId]
  );

  useEffect(() => {
    debouncedSave(blocks);
    return () => debouncedSave.cancel();//clears the changes made before the final state so that only the final state is stored
  }, [blocks, debouncedSave]);

  return debouncedSave;
}
