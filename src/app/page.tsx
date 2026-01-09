"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
  try {
    const q = query(
      collection(db, "news"),
      where("status", "==", "published")
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data(),
})) as any[];
// クライアント側で日付順にソートして最新4件を取得
const sortedData = data.sort((a: any, b: any) => (b.date > a.date ? 1 : -1)).slice(0, 4);
    setNewsList(sortedData);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};
    fetchNews();
  }, []);

  const features = [
    { title: "Location", desc: "本町駅1番出口より徒歩5分の好立地。仕事帰りや隙間時間にも通いやすい環境です。" },
    { title: "Instructor", desc: "アダルト黒帯全日本チャンピオンが直接指導。世界基準の技術を丁寧にレクチャーします。" },
    { title: "Direct Shop", desc: "マーシャルワールド直営店を併設。最新の格闘技ギアをその場で見極め、購入可能です。" },
    { title: "Amenities", desc: "男女別の清潔な更衣室と無料シャワーを完備。練習後も快適に次の予定へ向かえます。" },
    { title: "Machines", desc: "本格的なトレーニングマシンを完備。格闘技に必要な補強運動も道場内で完結します。" },
    { title: "Rental", desc: "道着などの用具レンタルが可能。手ぶらでOKなので、思い立った時に練習できます。" },
    { title: "Safety", desc: "スポーツ保険完備。万が一の怪我にも備え、安心してトレーニングに集中できる環境です。" },
  ];

  return (
    <main>
      {/* ヒーローセクション */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* 背景画像 */}
        <Image
          src="/hm-t-hero-1.png" 
          alt="トレーニングジムの風景"
          fill
          priority
          className="object-cover"
        />
        {/* オーバーレイを濃くして視認性を向上 */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 text-center px-6 pt-12 md:pt-0">
          <p className="text-orange-500 font-bold tracking-[0.3em] mb-3 md:mb-6 text-xs md:text-base">
            BEGIN YOUR EVOLUTION
          </p>
          <h1 className="text-4xl md:text-6xl font-black italic leading-tight tracking-tighter">
            理想の自分へ、<br className="md:hidden" />最短ルート。
          </h1>
          <p className="mt-4 md:mt-8 text-gray-200 max-w-xl mx-auto text-sm md:text-lg leading-relaxed">
            初心者・未経験者大歓迎。<br />本町駅すぐの本格ジムで、
            理想の体と自信を手に入れる。<br />今なら無料体験受付中。
          </p>
          
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-4 md:gap-5 justify-center items-center">
            <button className="bg-orange-600 text-white px-10 py-4 md:px-12 md:py-5 font-bold text-base md:text-lg hover:bg-orange-500 transition-all shadow-2xl shadow-orange-900/40 cursor-pointer">
              今すぐ無料で体験する
            </button>
            <Link href="/class" className="border border-white/20 text-white px-10 py-4 md:px-12 md:py-5 font-bold text-base md:text-lg hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer">
              クラスの紹介
            </Link>
          </div>
        </div>

        {/* スクロールを促す表示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-white animate-pulse"></div>
        </div>
      </section>

      {/* コンセプトリードセクション */}
      <section className="py-24 bg-white relative overflow-hidden font-[family-name:var(--font-oswald)]">
        {/* 背景タイポグラフィ */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-20 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
          <span className="text-[15rem] md:text-[25rem] font-black italic leading-none uppercase tracking-tighter">
            AUTHENTIC
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-gray-900">
                REAL <span className="text-orange-600">VIBES</span><br />
                EVERY DAY.
              </h2>
              <p className="text-gray-400 font-bold mt-4 tracking-[0.2em] uppercase text-sm md:text-base">
                本物を、日常に。
              </p>
            </div>
            <div className="md:w-1/2 md:pt-4">
              <div className="space-y-6 text-gray-600 font-sans text-base md:text-lg leading-relaxed">
                <p>
                  大阪・本町駅すぐの好立地に、新ジムが誕生。<br />
                  ブラジリアン柔術を中心に、キックボクシングやMMAまで、多彩なクラスをご用意。
                </p>
                <p>
                  日本トップレベルのインストラクターが格闘技の楽しさ、最高峰の技術を丁寧に指導します。
                  初心者から上級者まで、老若男女問わず歓迎。
                </p>
                <p className="text-gray-900 font-bold text-xl md:text-2xl italic">
                  日常を変える一歩を、ここから。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ジムの特長セクション */}
      <section className="py-24 bg-white font-[family-name:var(--font-oswald)] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 border-l-8 border-orange-600 pl-6">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
              GYM <span className="text-orange-600">FEATURES</span>
            </h2>
            <p className="text-gray-400 font-bold mt-2 tracking-widest uppercase text-sm">ジムの特長</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 overflow-hidden shadow-2xl">
            {features.map((f, i) => (
              <div 
                key={i} 
                className="bg-white p-6 md:p-10 relative group hover:bg-gray-50 transition-colors duration-500"
              >
                {/* ナンバリング背景 */}
                <span className="absolute top-2 right-2 md:top-4 md:right-6 text-8xl md:text-9xl font-black italic text-gray-50 group-hover:text-orange-50 transition-colors duration-500 leading-none">
                  0{i + 1}
                </span>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-4 md:mb-6">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed font-medium border-l-2 border-gray-100 pl-4 group-hover:border-orange-600 transition-colors duration-500">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* 空きスペースを埋めるCTAブロック */}
            <div className="bg-orange-600 p-6 md:p-10 relative group flex flex-col justify-center lg:col-span-2 overflow-hidden">
              {/* 背景の装飾的なタイポグラフィ */}
              <div className="absolute -right-4 -bottom-8 opacity-10 select-none pointer-events-none">
                <span className="text-9xl font-black italic uppercase tracking-tighter text-white">JOIN</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
                  START YOUR <span className="text-black">EVOLUTION</span>
                </h3>
                <p className="text-orange-100 font-bold mb-6 md:mb-8 max-w-md text-sm md:text-base">
                  本物の技術、最高の環境。あなたの挑戦を私たちが全力でサポートします。まずは無料体験から。
                </p>
                <Link 
                  href="/reservation" 
                  className="inline-block bg-white text-orange-600 px-10 py-4 font-black italic uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl"
                >
                  体験予約はこちらから →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ブラジリアン柔術の魅力セクション */}
      <section className="py-24 bg-white font-[family-name:var(--font-oswald)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="border-l-8 border-orange-600 pl-6">
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                The Charm of BJJ
              </h2>
              <p className="text-gray-400 font-bold mt-2 tracking-widest uppercase text-sm">ブラジリアン柔術の魅力</p>
            </div>
            <p className="text-gray-600 font-sans max-w-md leading-relaxed">
              格闘技の枠を超え、ライフスタイルとして世界中で愛されるブラジリアン柔術。その奥深い魅力を3つのポイントでご紹介します。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* 魅力 1 */}
            <div className="group">
              <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden shadow-lg">
                <Image
                  src="/oh-1001.jpg" 
                  alt="Mental Game"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="text-9xl md:text-[10rem] font-black italic text-gray-50 group-hover:text-orange-50 transition-colors leading-none mb-[-50px] md:mb-[-60px] relative z-0">01</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black italic uppercase mb-4 border-b-2 border-black pb-2 inline-block">Mental Game</h3>
                <p className="text-gray-700 font-sans leading-relaxed">
                  「体を使ったチェス」と称される柔術は、力だけでなくテクニックと戦略が重要です。パズルを解くような知的な興奮が、日常のストレスを忘れさせてくれます。
                </p>
              </div>
            </div>
            {/* 魅力 2 */}
            <div className="group">
              <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden shadow-lg">
                <Image
                  src="/oh-1002.png"
                  alt="Total Fitness"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="text-9xl md:text-[10rem] font-black italic text-gray-50 group-hover:text-orange-50 transition-colors leading-none mb-[-50px] md:mb-[-60px] relative z-0">02</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black italic uppercase mb-4 border-b-2 border-black pb-2 inline-block">Total Fitness</h3>
                <p className="text-gray-700 font-sans leading-relaxed">
                  全身を連動させる動きにより、筋力、柔軟性、持久力が自然と向上します。楽しみながら動いているうちに、理想的な引き締まった体へと変化していきます。
                </p>
              </div>
            </div>
            {/* 魅力 3 */}
            <div className="group">
              <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden shadow-lg">
                <Image
                  src="/oh-04.jpg"
                  alt="Community"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="text-9xl md:text-[10rem] font-black italic text-gray-50 group-hover:text-orange-50 transition-colors leading-none mb-[-50px] md:mb-[-60px] relative z-0">03</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black italic uppercase mb-4 border-b-2 border-black pb-2 inline-block">Community</h3>
                <p className="text-gray-700 font-sans leading-relaxed">
                  マットの上では年齢や職業は関係ありません。共に汗を流し、技術を高め合う仲間との絆は、あなたの人生をより豊かにする一生の財産になります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MMA & KickBoxing セクション */}
      <section className="py-24 bg-black text-white font-[family-name:var(--font-oswald)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* MMA */}
            <div className="relative group overflow-hidden border border-white/10">
              <div className="relative aspect-[4/5] lg:aspect-[16/9]">
                <Image
                  src="/mma-hero.png" 
                  alt="MMA"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-2 md:mb-4">
                    MMA
                  </h2>
                  <p className="text-gray-300 font-sans max-w-md leading-relaxed text-sm md:text-base">
                    打撃、投げ、寝技を融合させた総合格闘技。初心者からプロ志望まで、個々のレベルに合わせた指導で、究極の強さを追求します。
                  </p>
                </div>
              </div>
            </div>

            {/* KickBoxing */}
            <div className="relative group overflow-hidden border border-white/10">
              <div className="relative aspect-[4/5] lg:aspect-[16/9]">
                <Image
                  src="/kick-hero.png" 
                  alt="KickBoxing"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-2 md:mb-4">
                    Kick<span className="text-orange-600">Boxing</span>
                  </h2>
                  <p className="text-gray-300 font-sans max-w-md leading-relaxed text-sm md:text-base">
                    パンチとキックを組み合わせた全身運動。ダイエットやストレス解消はもちろん、本格的なテクニックも基礎から丁寧にレクチャーします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最新ニュースセクション */}
      <section className="py-24 bg-gray-50 font-[family-name:var(--font-oswald)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12 border-l-8 border-orange-600 pl-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                Latest News
              </h2>
              <p className="text-gray-400 font-bold mt-2 tracking-widest uppercase text-sm">最新のお知らせ</p>
            </div>
            <Link href="/news" className="text-orange-600 font-bold hover:underline italic uppercase tracking-tighter hidden md:block">
              View All News →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {newsList.map((item) => (
              <Link 
                key={item.id} 
                href={`/news/${item.id}`}
                className="group flex flex-col bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                  {(item.image || item.imageUrl || item.thumbnail) ? (
                    <Image
                      src={item.image || item.imageUrl || item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized={true}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 font-black italic text-xs tracking-widest">NO IMAGE</div>
                  )}
                </div>

                <div className="px-2 pt-2 md:px-4 md:pt-4 flex items-center gap-2 md:gap-3">
                  <span className="text-gray-400 font-bold text-[10px]">
                    {item.date?.seconds 
                      ? new Date(item.date.seconds * 1000).toLocaleDateString('ja-JP').replace(/\//g, '.')
                      : typeof item.date === 'string' 
                        ? item.date.replace(/-/g, '.') 
                        : '---'}
                  </span>
                  <span className="bg-black text-white text-[8px] px-2 py-0.5 font-black italic uppercase tracking-tighter">
                    {item.category || "INFO"}
                  </span>
                </div>

                <div className="flex-1 p-2 md:p-4">
                  <h2 className="text-sm md:text-base font-black italic uppercase group-hover:text-orange-600 transition-colors mb-1 md:mb-2 leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-[10px] font-bold line-clamp-2 italic">
                    {item.content?.replace(/<[^>]*>?/gm, '')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/news" className="inline-block bg-black text-white px-8 py-3 font-bold text-sm hover:bg-orange-600 transition-all">
              VIEW ALL NEWS
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}