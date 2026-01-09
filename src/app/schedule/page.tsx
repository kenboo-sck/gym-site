"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from 'next/link';

export default function WeeklySchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [classInfo, setClassInfo] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        // スケジュールとクラス情報の両方を取得
        const scheduleQuery = query(
          collection(db, "schedules"),
          orderBy("startTime", "asc")
        );

        const classQuery = query(
          collection(db, "class_info"),
          orderBy("order", "asc")
        );

        const [scheduleSnap, classSnap] = await Promise.all([
          getDocs(scheduleQuery),
          getDocs(classQuery)
        ]);

        const scheduleData = scheduleSnap.docs.map(doc => {
          const raw = doc.data();
          return {
            id: doc.id,
            ...raw,
            dayOfWeek: Number(raw.dayOfWeek ?? 0),
            startTime: raw.startTime || "",
            endTime: raw.endTime || ""
          };
        });

        // デバッグログの強化
        const classData = classSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Schedules:", scheduleData.length);
        console.log("Fetched Class Info:", classData.length);

        setSchedules(scheduleData);
        setClassInfo(classData);
      } catch (error) {
        console.error("Firebase Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  if (loading) return (
    <div className="pt-40 text-center font-[family-name:var(--font-oswald)] font-black italic animate-pulse text-3xl">
      LOADING...
    </div>
  );

  const weekLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const weekDaysJP = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"];

  // class_infoが空の場合、スケジュールから一意のクラスを抽出して表示する（デバッグ兼バックアップ）
  const uniqueClassesFromSchedules = Array.from(new Map(schedules.map(s => [s.title, s])).values())
    .map(s => ({
      id: `temp-${s.title}`,
      title: s.title,
      color: s.color,
      description: "Firebaseの 'class_info' コレクションにこのクラスの説明文を登録してください。"
    }));

  const displayClasses = classInfo.length > 0 ? classInfo : uniqueClassesFromSchedules;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto font-[family-name:var(--font-oswald)]">
      
      {/* ヘッダー */}
      <section className="mb-16">
        <div className="border-l-8 border-orange-600 pl-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
            WEEKLY <span className="text-orange-600">SCHEDULE</span>
          </h1>
          <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">スケジュール</p>
        </div>
      </section>

      {/* PC版：週間グリッド (md以上) */}
      <div className="hidden md:block">
        <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 overflow-hidden shadow-2xl">
          {weekLabels.map(day => (
            <div key={day} className="bg-black text-white py-6 text-center font-black italic text-sm tracking-[0.3em]">{day}</div>
          ))}
          {weekLabels.map((_, index) => {
            const daySchedules = schedules.filter(s => s.dayOfWeek === index);

            return (
              <div key={index} className="bg-white min-h-[400px] p-3 transition-colors hover:bg-gray-50 border-r border-gray-100 last:border-r-0 flex flex-col">
                <div className="space-y-3 flex-1">
                  {daySchedules.length > 0 ? (
                    daySchedules.map(item => (
                      <div 
                        key={item.id} 
                        style={{ borderLeftColor: item.color || '#ea580c' }}
                        className="bg-white border-l-4 p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <div style={{ color: item.color || '#ea580c' }} className="font-black text-[15px] leading-tight mb-1">
                          {item.startTime}-{item.endTime}
                        </div>
                        <div className="font-black text-[13px] leading-tight mb-2 uppercase italic">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold italic flex flex-col gap-1">
                          {item.coach && <span className="text-gray-900 opacity-60">Coach: {item.coach}</span>}
                        </div>
                      </div>
                    ))
                  ) : index === 6 ? (
                    <div className="h-full flex items-center justify-center py-20">
                      <span className="text-gray-200 font-black italic text-4xl rotate-[-15deg] tracking-widest">CLOSE</span>
                    </div>
                  ) : (
                    null
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* スマホ版：曜日別リスト (md未満) */}
      <div className="md:hidden space-y-10">
        {weekLabels.map((label, index) => {
          const daySchedules = schedules.filter(s => s.dayOfWeek === index);
          if (daySchedules.length === 0 && index !== 6) return null;

          return (
            <div key={label} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-black italic text-gray-200 leading-none">{label}</span>
                <div className="h-[1px] flex-1 bg-gray-100"></div>
              </div>
              <div className="space-y-4">
                {daySchedules.length > 0 ? (
                  daySchedules.map(item => (
                    <div key={item.id} className="relative p-6 bg-white border border-gray-100 shadow-xl overflow-hidden">
                      <div style={{ backgroundColor: item.color || '#ea580c' }} className="absolute top-0 left-0 w-2 h-full"></div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-3xl font-black italic leading-none" style={{ color: item.color || '#ea580c' }}>
                          {item.startTime}-{item.endTime}
                        </div>
                        <span className="bg-black text-white text-[9px] px-3 py-1 font-black italic uppercase tracking-tighter">
                          {item.status || 'OPEN'}
                        </span>
                      </div>
                      <h3 className="text-xl font-black italic uppercase tracking-tight mb-1">{item.title}</h3>
                      {item.coach && <p className="text-sm text-gray-400 font-bold italic uppercase">Coach: <span className="text-black">{item.coach}</span></p>}
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-gray-100">
                    <span className="text-5xl font-black italic text-gray-200 uppercase tracking-widest">CLOSE</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* クラス説明セクション */}
      <section className="mt-24">
        <div className="border-l-8 border-orange-600 pl-6 mb-12">
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
            CLASS <span className="text-orange-600">DESCRIPTIONS</span>
          </h2>
          <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">クラス紹介</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayClasses.length > 0 ? (
            displayClasses.map((cls) => (
              <div 
                key={cls.id} 
                onClick={() => setSelectedClass(cls)}
                className="group bg-white p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                {/* 背景タイポグラフィ */}
                <div className="absolute -bottom-2 -right-2 select-none pointer-events-none z-0 opacity-[0.05] whitespace-nowrap group-hover:scale-110 transition-transform duration-700">
                  <span className="text-7xl font-black italic leading-none uppercase tracking-tighter">
                    {cls.title}
                  </span>
                </div>

                {/* ホバー時のアクセントグラデーション */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${cls.color || '#ea580c'}, transparent)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" 
                      style={{ backgroundColor: cls.color || '#ea580c' }}
                    />
                    <h3 className="text-2xl font-black italic uppercase tracking-tight">{cls.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-bold italic">
                    {cls.description || `${cls.title}の説明文が設定されていません。`}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold italic">クラス情報が見つかりません。Firebaseの「class_info」コレクションを確認してください。</p>
            </div>
          )}
        </div>
      </section>

      {/* クラス別スケジュールポップアップ */}
      {selectedClass && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* 背景オーバーレイ */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setSelectedClass(null)}
          />
          
          {/* モーダル本体 */}
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            {/* ヘッダー */}
            <div className="p-8 pb-0 flex justify-between items-start">
              <div className="border-l-8 pl-4" style={{ borderLeftColor: selectedClass.color || '#ea580c' }}>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
                  {selectedClass.title}
                </h3>
                <p className="text-orange-600 text-xs font-bold mt-1 tracking-widest uppercase">Class Details & Schedule</p>
              </div>
              <button 
                onClick={() => setSelectedClass(null)}
                className="text-gray-400 hover:text-black transition-colors p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* コンテンツ */}
            <div className="p-8">
              {/* クラス説明 */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 italic">Description / クラス概要</h4>
                <p className="text-gray-700 leading-relaxed font-sans">
                  {selectedClass.description}
                </p>
              </div>

              {/* こんな方にお勧め */}
              {selectedClass.recommended && selectedClass.recommended.length > 0 && (
                <div className="mb-8 p-6 bg-gray-50">
                  <h4 className="text-sm font-black italic uppercase mb-4 tracking-widest text-orange-600">
                    こんな方にお勧め
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedClass.recommended.map((item: string, rIdx: number) => (
                      <li key={rIdx} className="flex items-center gap-3 text-sm font-bold italic text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-orange-600 text-white flex items-center justify-center text-[10px]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 週間スケジュール */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 italic">Weekly Schedule / 週間スケジュール</h4>
                {weekLabels.map((label, idx) => {
                  // タイトルの空白を除去し、小文字に変換して比較（より柔軟なマッチング）
                  const daySessions = schedules.filter(s => 
                    s.title?.trim().toLowerCase() === selectedClass.title?.trim().toLowerCase() && 
                    s.dayOfWeek === idx
                  );
                  if (daySessions.length === 0) return null;

                  return (
                    <div key={label} className="flex items-center gap-4 p-4 border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center justify-center min-w-[60px] border-r border-gray-100 pr-4">
                        <span className="text-xl font-black italic text-gray-900 leading-none">{label}</span>
                        <span className="text-[10px] font-bold text-gray-400 mt-1">{weekDaysJP[idx]}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {daySessions.map(session => (
                          <span key={session.id} className="bg-white px-4 py-1 text-sm font-black italic border border-gray-100 shadow-sm">
                            {session.startTime} - {session.endTime}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {/* 全曜日通してスケジュールが存在するかチェック */}
                {schedules.filter(s => 
                  s.title?.trim().toLowerCase() === selectedClass.title?.trim().toLowerCase()
                ).length === 0 && (
                  <p className="text-center py-8 text-gray-400 font-bold italic">現在、このクラスの定期スケジュールはありません。</p>
                )}
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/reservation"
                  className="flex-1 bg-orange-600 text-white text-center py-4 font-black italic uppercase tracking-widest hover:bg-orange-500 transition-colors shadow-xl shadow-orange-600/20"
                >
                  Free Trial / 無料体験予約
                </Link>
                <button 
                  onClick={() => setSelectedClass(null)}
                  className="flex-1 bg-black text-white py-4 font-black italic uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}