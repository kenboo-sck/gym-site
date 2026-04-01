
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import NewsDetailPage from "./NewsDetailPage";

// ビルド時に実行され、生成すべきパスのリストを返す
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
  return <NewsDetailPage />;
}