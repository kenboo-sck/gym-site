"use client";

import { useState, useEffect } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminNewsPage() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("INFO");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/admin/login");
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("タイトルと本文は必須です");
    setLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, `news/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "news"), {
        title,
        category,
        date,
        content,
        image: imageUrl,
        createdAt: new Date(),
      });

      alert("記事を公開しました！");
      router.push("/news");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="pt-40 text-center font-black italic">読み込み中...</div>;

  return (
    <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto font-[family-name:var(--font-oswald)]">
      <div className="flex justify-between items-end mb-8 border-l-8 border-orange-600 pl-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">ニュース作成</h1>
          <p className="text-sm text-gray-500 mt-2">新しいニュース記事を作成して公開します</p>
        </div>
        <Link href="/admin/dashboard" className="text-gray-400 hover:text-black font-bold text-sm">← 戻る</Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">タイトル</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-sans" 
            placeholder="記事のタイトルを入力"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">カテゴリ</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-sans"
            >
              <option value="INFO">お知らせ</option>
              <option value="EVENT">イベント</option>
              <option value="CAMPAIGN">キャンペーン</option>
              <option value="HOLIDAY">休館日</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">日付</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-sans" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">メイン画像（任意）</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files?.[0] || null)} 
            className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-black file:text-white hover:file:bg-orange-600 file:transition-all" 
          />
          <p className="text-xs text-gray-400 mt-1">推奨サイズ: 1200x630px</p>
        </div>
        
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[300px] p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-sans resize-y"
            placeholder="記事の内容を入力してください..."
            required
          />
          <p className="text-xs text-gray-400 mt-1">改行は自動的に反映されます</p>
        </div>
        
        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full py-5 rounded-xl font-black italic uppercase tracking-widest text-white transition-all ${loading ? "bg-gray-400" : "bg-orange-600 hover:bg-black shadow-xl shadow-orange-200"}`}
        >
          {loading ? "投稿中..." : "記事を公開する"}
        </button>
      </form>
    </div>
  );
}