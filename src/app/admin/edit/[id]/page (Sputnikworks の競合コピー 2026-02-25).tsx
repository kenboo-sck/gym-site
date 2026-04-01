
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import EditNewsPage from "./EditNewsPage";

export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "news"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error fetching news IDs for static params:", error);
    return [];
  }
}

export default function Page() {
  return <EditNewsPage />;
}