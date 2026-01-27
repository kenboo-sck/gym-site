"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function InstructorsPage() {
  return (
    <div className="pt-32 pb-20 font-[family-name:var(--font-oswald)]">
      {/* ヒーローセクション */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="border-l-8 border-orange-600 pl-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
            INSTRUCTORS
          </h1>
          <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">インストラクター</p>
        </div>
      </section>

      {/* インストラクター詳細 */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* 画像エリア */}
          <div className="w-full md:w-1/2 relative aspect-[3/4] overflow-hidden shadow-2xl bg-gray-100">
            <Image
              src="/instructor-keita.jpg" // 実際の画像パスに差し替えてください
              alt="井上啓太"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">Head Instructor</p>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">Keita Inoue</h2>
            </div>
          </div>

          {/* プロフィールエリア */}
          <div className="w-full md:w-1/2 space-y-10">
            <div>
              <h2 className="text-4xl font-black italic uppercase text-gray-900 mb-2">井上 啓太</h2>
              <div className="flex flex-wrap gap-3">
                <span className="bg-black text-white px-4 py-1 text-xs font-bold italic uppercase tracking-widest">
                  ブラジリアン柔術 黒帯二段
                </span>
                <span className="bg-gray-200 text-gray-700 px-4 py-1 text-xs font-bold italic uppercase tracking-widest">
                  柔道 初段
                </span>
              </div>
            </div>

            <div className="space-y-8">
              {/* ブラジリアン柔術 実績 */}
              <div className="bg-gray-50 p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black italic uppercase mb-6 border-b-2 border-orange-600 pb-2 inline-block">
                  BJJ Achievements
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">主な実績（ブラジリアン柔術 黒帯アダルト）</p>
                <ul className="space-y-4 font-sans text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">●</span>
                    <div>
                      <p className="font-bold">JBJJF全日本選手権 階級別 優勝</p>
                      <p className="text-xs text-gray-500 mt-1">2023, 2025</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">●</span>
                    <div>
                      <p className="font-bold">IBJJFアジア選手権 階級別 3位</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">●</span>
                    <div>
                      <p className="font-bold">IBJJFソウル国際選手権 階級別・無差別級 優勝</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* MMA 実績 */}
              <div className="bg-black text-white p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 blur-[80px] opacity-20"></div>
                <h3 className="text-xl font-black italic uppercase mb-6 border-b-2 border-orange-600 pb-2 inline-block relative z-10">
                  MMA Record
                </h3>
                <div className="relative z-10">
                  <p className="text-5xl font-black italic tracking-tighter mb-2">7戦 5勝 2敗</p>
                  <p className="text-orange-500 font-bold italic tracking-widest text-sm uppercase">
                    ( 2 TKO / 3 Submissions )
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://picro.jp/sports/almafight/trials/entry/3284"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block bg-orange-600 text-white px-12 py-5 hover:bg-black transition-all duration-300 border-r-4 border-orange-400 hover:border-gray-600 shadow-xl"
              >
                <div className="flex flex-col items-start leading-none relative">
                  {/* 装飾用の垂直ライン */}
                  <div className="absolute -left-4 top-0 w-[1px] h-full bg-white/40"></div>
                  <span className="text-[10px] font-black tracking-[0.4em] mb-1 opacity-80 uppercase">Free Trial</span>
                  <span className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-4">
                    クラスを体験する
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}