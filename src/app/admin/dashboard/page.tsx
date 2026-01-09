"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function NewsManagement() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchNews = async () => {
    try {
      const q = query(collection(db, "news"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
const sortedData = data.sort((a: any, b: any) => {
  const aTime = a.createdAt?.seconds || 0;
  const bTime = b.createdAt?.seconds || 0;
  return bTime - aTime;
});
      setNewsList(sortedData);
      setFilteredNews(sortedData);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // フィルター処理
  useEffect(() => {
    let filtered = [...newsList];
    
    // カテゴリフィルター
    if (categoryFilter !== "ALL") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // ステータスフィルター
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    setFilteredNews(filtered);
    setCurrentPage(1); // フィルター変更時は1ページ目に戻る
  }, [categoryFilter, statusFilter, newsList]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("この記事を削除しますか？")) return;
    try {
      await deleteDoc(doc(db, "news", id));
      alert("削除しました");
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("削除に失敗しました");
    }
  };

  // ページネーション計算
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredNews.slice(startIndex, endIndex);

  const getCategoryLabel = (category: string) => {
    const labels: any = {
      "INFO": "お知らせ",
      "EVENT": "イベント",
      "CAMPAIGN": "キャンペーン",
      "HOLIDAY": "休館日"
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-4">
      {/* フィルターUI */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center p-4 bg-gray-50 border border-gray-100">
        <div className="flex items-center gap-2 flex-1">
          <label className="text-xs font-bold text-gray-600 shrink-0">カテゴリ:</label>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-1 px-3 py-2 bg-white border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">すべて</option>
            <option value="INFO">お知らせ</option>
            <option value="EVENT">イベント</option>
            <option value="CAMPAIGN">キャンペーン</option>
            <option value="HOLIDAY">休館日</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 flex-1">
          <label className="text-xs font-bold text-gray-600 shrink-0">ステータス:</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 px-3 py-2 bg-white border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">すべて</option>
            <option value="published">公開</option>
            <option value="draft">下書き</option>
          </select>
        </div>
        
        <div className="sm:ml-auto text-sm text-gray-500 text-right">
          全{filteredNews.length}件
        </div>
      </div>

      {/* 記事一覧 */}
      {currentItems.length === 0 ? (
        <p className="text-center py-8 text-gray-400 italic">記事がありません</p>
      ) : (
        <>
          {currentItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 border border-gray-100 gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {item.image && (
                  <Image src={item.image} alt={item.title} width={60} height={60} className="object-cover flex-shrink-0" unoptimized />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <div className="font-bold text-sm truncate">{item.title}</div>
                    <span className={`text-[10px] px-2 py-0.5 font-bold ${
                      item.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status === 'published' ? '公開' : '下書き'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-600 mr-2">
                      {getCategoryLabel(item.category)}
                    </span>
                    {item.date}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <Link 
                  href={`/admin/edit/${item.id}`}
                  className="flex-1 sm:flex-none text-center bg-blue-500 text-white px-4 py-2 font-bold text-xs hover:bg-blue-600 transition-all"
                >
                  編集
                </Link>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="flex-1 sm:flex-none text-center bg-red-500 text-white px-4 py-2 font-bold text-xs hover:bg-red-600 transition-all"
                >
                  削除
                </button>
              </div>
            </div>
          ))}

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 font-bold text-sm transition-all ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                ← 前へ
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 font-bold text-sm transition-all ${
                      currentPage === page
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 font-bold text-sm transition-all ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                次へ →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [coach, setCoach] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("#ea580c");
  const [status, setStatus] = useState("OPEN");
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const router = useRouter();

  const weekLabels = ["月曜日 (MON)", "火曜日 (TUE)", "水曜日 (WED)", "木曜日 (THU)", "金曜日 (FRI)", "土曜日 (SAT)", "日曜日 (SUN)"];

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

  const fetchSchedules = async () => {
    try {
      const q = query(collection(db, "schedules"), orderBy("startTime", "asc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sortedData = data.sort((a: any, b: any) => (a.dayOfWeek || 0) - (b.dayOfWeek || 0));
      setSchedules(sortedData);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    if (user) fetchSchedules();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "schedules"), {
        title,
        coach,
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime,
        color,
        status,
        createdAt: new Date(),
      });
      alert("スケジュールを追加しました");
      setTitle("");
      setCoach("");
      setDayOfWeek(0);
      setStartTime("");
      setEndTime("");
      fetchSchedules();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCoach(item.coach || "");
    setDayOfWeek(item.dayOfWeek || 0);
    setStartTime(item.startTime || "");
    setEndTime(item.endTime || "");
    setColor(item.color);
    setStatus(item.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);
    try {
      const docRef = doc(db, "schedules", editingId);
      await updateDoc(docRef, {
        title,
        coach,
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime,
        color,
        status,
        updatedAt: new Date(),
      });
      alert("スケジュールを更新しました");
      setEditingId(null);
      setTitle("");
      setCoach("");
      setDayOfWeek(0);
      setStartTime("");
      setEndTime("");
      setColor("#ea580c");
      setStatus("OPEN");
      fetchSchedules();
    } catch (error) {
      console.error("Error updating document:", error);
      alert("更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setCoach("");
    setDayOfWeek(0);
    setStartTime("");
    setEndTime("");
    setColor("#ea580c");
    setStatus("OPEN");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("このスケジュールを削除しますか？")) return;
    try {
      await deleteDoc(doc(db, "schedules", id));
      alert("削除しました");
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("削除に失敗しました");
    }
  };

  if (authLoading) return <div className="pt-40 text-center font-black italic">読み込み中...</div>;

  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto pb-20 font-[family-name:var(--font-oswald)]">
      
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black italic uppercase">管理ダッシュボード</h1>
          <p className="text-sm text-gray-500 mt-2">スケジュールとニュースを管理できます</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Link 
            href="/admin/create" 
            className="flex-1 sm:flex-none text-center bg-orange-600 text-white px-6 py-3 font-bold text-sm hover:bg-black transition-all italic uppercase"
          >
            + ニュース作成
          </Link>
          <button 
            onClick={() => auth.signOut()}
            className="flex-1 sm:flex-none text-center border border-gray-200 text-gray-400 hover:text-black font-bold text-sm italic uppercase px-6 py-3"
          >
            ログアウト
          </button>
        </div>
      </div>

      {/* スケジュール追加・編集フォーム */}
      <form onSubmit={editingId ? handleUpdate : handleSubmit} className="bg-gray-900 text-white p-6 md:p-8 mb-12 shadow-2xl border border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-black italic uppercase text-orange-500">
            {editingId ? "スケジュール編集" : "スケジュール追加"}
          </h2>
          {editingId && (
            <button 
              type="button"
              onClick={handleCancelEdit}
              className="text-gray-400 hover:text-white font-bold text-sm"
            >
              キャンセル
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 mb-6">
          {editingId 
            ? "既存のスケジュールを編集して更新できます" 
            : "新しいクラスやイベントをスケジュールに追加します"}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">クラス名・イベント名</label>
              <input
                type="text"
                placeholder="例: BJJクラス、キックボクシング"
                className="w-full bg-gray-800 border-none p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">インストラクター名</label>
              <input
                type="text"
                placeholder="例: 山田太郎"
                className="w-full bg-gray-800 border-none p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                value={coach}
                onChange={(e) => setCoach(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">曜日</label>
              <select
                className="w-full bg-gray-800 border-none p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(Number(e.target.value))}
                required
              >
                {weekLabels.map((label, idx) => (
                  <option key={idx} value={idx}>{label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">開始時間</label>
                <input
                  type="time"
                  className="w-full bg-gray-800 border-none px-2 py-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">終了時間</label>
                <input
                  type="time"
                  className="w-full bg-gray-800 border-none px-2 py-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">ステータス</label>
              <select 
                className="w-full bg-gray-800 border-none p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="OPEN">受付中</option>
                <option value="CLOSED">満員</option>
                <option value="SPECIAL">特別クラス</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">カラー（カレンダー表示用）</label>
              <input
                type="color"
                className="w-full h-12 bg-gray-800 border-none cursor-pointer"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <button 
          disabled={loading}
          className="w-full mt-8 bg-orange-600 hover:bg-orange-500 text-white font-black italic py-4 transition-all uppercase tracking-widest"
        >
          {loading ? "処理中..." : (editingId ? "スケジュールを更新" : "スケジュールを追加")}
        </button>
      </form>

      {/* 既存スケジュール一覧 */}
      <div className="bg-white p-6 md:p-8 shadow-xl border border-gray-100 mb-8">
        <button
          type="button"
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
          className="w-full flex justify-between items-center group"
        >
          <div>
            <h2 className="text-xl font-black italic uppercase text-left">登録済みスケジュール</h2>
            <p className="text-xs text-gray-500 mt-2 text-left">既存のスケジュールを編集・削除できます。編集ボタンを押すと上部のフォームに読み込まれます。</p>
          </div>
          <div className="text-2xl text-gray-400 group-hover:text-orange-600 transition-colors">
            {isScheduleOpen ? '▼' : '▶'}
          </div>
        </button>
        
        {isScheduleOpen && (
          <div className="space-y-4 mt-6">
            {schedules.length === 0 ? (
              <p className="text-center py-8 text-gray-400 italic">スケジュールがありません</p>
            ) : (
              schedules.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div style={{ backgroundColor: item.color }} className="w-3 h-3 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm">{item.title}</div>
                      <div className="text-xs text-gray-400">
                        {weekLabels[item.dayOfWeek]} {item.startTime} - {item.endTime} {item.coach && `| ${item.coach} `}| {item.status === "OPEN" ? "受付中" : item.status === "CLOSED" ? "満員" : "特別"}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="flex-1 sm:flex-none bg-blue-500 text-white px-4 py-2 font-bold text-xs hover:bg-blue-600 transition-all"
                    >
                      編集
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="flex-1 sm:flex-none bg-red-500 text-white px-4 py-2 font-bold text-xs hover:bg-red-600 transition-all"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ニュース管理 */}
      <div className="bg-white p-6 md:p-8 shadow-xl border border-gray-100">
        <div className="mb-6">
          <h2 className="text-xl font-black italic uppercase">ニュース管理</h2>
          <p className="text-xs text-gray-500 mt-2">公開済みのニュース記事を編集・削除できます。新しい記事は上部の「+ ニュース作成」ボタンから作成してください。</p>
        </div>
        <NewsManagement />
      </div>
    </div>
  );
}