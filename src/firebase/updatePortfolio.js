import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";


export const updatePortfolio = async (portfolioId, editorState) => {
  if (!portfolioId) {
    throw new Error("Portfolio ID is required");
  }

  try {
    const portfolioRef = doc(db, "portfolios", portfolioId);

    await updateDoc(portfolioRef, {
      ...editorState,              // title, theme, sections, etc.
      updatedAt: serverTimestamp(),
    });

    console.log("Portfolio updated successfully");
  } catch (error) {
    console.error("Error updating portfolio:", error);
    throw error;
  }
};
