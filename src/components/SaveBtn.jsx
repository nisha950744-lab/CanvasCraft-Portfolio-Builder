// SaveBtn.jsx
import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function SaveBtn({ blocks, projectId, user }) {
  const [isSaving, setIsSaving] = useState(false);

  const handleClick = async () => {
    console.log("Save button clicked", { user, projectId, blocks });

    if (!user || !user.uid || !projectId) {
      console.warn("Cannot save: missing user or projectId");
      return;
    }

    try {
      setIsSaving(true);

      const ref = doc(db, "users", user.uid, "projects", projectId);
      await setDoc(
        ref,
        {
          blocks: blocks ?? [],
          updatedAt: serverTimestamp(),
          status: "draft",
        },
        { merge: true }
      );

      console.log("✅ Manually saved", blocks?.length || 0, "blocks");
    } catch (err) {
      console.error("Manual save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isSaving}
      className="inline-flex items-center justify-center rounded-full px-4
       py-1.5 text-xs font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500
      text-white disabled:opacity-60"
    >
      {isSaving ? "Saving…" : "Save Project"}
    </button>
  );
}
