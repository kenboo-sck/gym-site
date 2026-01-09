"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

// エディタのスタイルを確実に適用
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

export default function EditNewsPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("INFO");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  const quillRef = useRef<any>(null);

  // エディタ内での画像アップロードハンドラ
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const storageRef = ref(storage, `news_content/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          
          // エディタインスタンスの取得をより確実に
          const quill = quillRef.current?.getEditor?.() || quillRef.current?.editor;
          const range = quill.getSelection();
          if (range) {
            quill.insertEmbed(range.index, 'image', url);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  // 認証チェック
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

  // 既存データを読み込み
  useEffect(() => {
    const fetchNews = async () => {
      if (!params.id) return;
      
      try {
        const docRef = doc(db, "news", params.id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setCategory(data.category || "INFO");
          setDate(data.date || "");
          setContent(data.content || "");
          setCurrentImage(data.image || "");
        } else {
          alert("記事が見つかりませんでした");
          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        alert("データの読み込みに失敗しました");
      } finally {
        setDataLoading(false);
      }
    };

    if (user) {
      fetchNews();
    }
  }, [user, params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("タイトルと本文は必須です");
    setLoading(true);

    try {
      let imageUrl = currentImage;
      
      // 新しい画像がアップロードされた場合
      if (newImage) {
        const storageRef = ref(storage, `news/${Date.now()}_${newImage.name}`);
        await uploadBytes(storageRef, newImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Firestoreを更新
      const docRef = doc(db, "news", params.id as string);
      await updateDoc(docRef, {
        title,
        category,
        date,
        content,
        image: imageUrl,
        updatedAt: new Date(),
      });

      alert("記事を更新しました！");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || dataLoading) {
    return <div className="pt-40 text-center font-black italic">LOADING...</div>;
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto font-[family-name:var(--font-oswald)]">
      <div className="flex justify-between items-end mb-8 border-l-8 border-orange-600 pl-6">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Edit News</h1>
        <Link href="/admin/dashboard" className="text-gray-400 hover:text-black font-bold text-sm italic uppercase">← Back</Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-sans" 
            placeholder="記事のタイトルを入力" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-sans"
            >
              <option value="INFO">INFO</option>
              <option value="EVENT">EVENT</option>
              <option value="CAMPAIGN">CAMPAIGN</option>
              <option value="HOLIDAY">HOLIDAY</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-sans" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Current Image</label>
          {currentImage && (
            <div className="mb-2">
              <img src={currentImage} alt="Current" className="w-32 h-32 object-cover rounded-xl" />
            </div>
          )}
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 mt-2">Change Image (Optional)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setNewImage(e.target.files?.[0] || null)} 
            className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-black file:text-white hover:file:bg-orange-600 file:transition-all" 
          />
        </div>
        
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Content</label>
          <div className="bg-white rounded-xl border border-gray-200 min-h-[400px] relative overflow-hidden">
            <ReactQuill
              forwardedRef={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="font-sans"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full py-5 rounded-xl font-black italic uppercase tracking-widest text-white transition-all ${loading ? "bg-gray-400" : "bg-orange-600 hover:bg-black shadow-xl shadow-orange-200"}`}
        >
          {loading ? "更新中..." : "記事を更新する"}
        </button>
      </form>
    </div>
  );
}