"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function RentalContent() {
  return (
    <div className="pt-32 pb-20 font-[family-name:var(--font-oswald)]">
      {/* ヒーローセクション */}
      <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
        {/* 背景タイポグラフィ */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
          <span className="text-[12rem] md:text-[22rem] font-black italic leading-none uppercase tracking-tighter">
            RENTAL SPACE
          </span>
        </div>

        <div className="relative z-10">
          <div className="border-l-8 border-orange-600 pl-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
              RENTAL <span className="text-orange-600">SPACE</span>
            </h1>
            <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">レンタルスペースのご案内</p>
          </div>
          <p className="font-sans text-gray-600 max-w-3xl text-base md:text-lg leading-relaxed">
            本格的な格闘技用マットエリアやトレーニング機器、更衣室・シャワー完備の快適なスペースを貸切でご利用いただけます。<br />
            個人での自主練習、パーソナルトレーニング、撮影、セミナー・ワークショップなど幅広い用途に対応いたします。
          </p>
        </div>
      </section>

      {/* 料金 & 利用可能時間メインカード */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 料金カード */}
          <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 md:p-12 shadow-2xl border-l-8 border-orange-600 flex flex-col justify-between">
            <div>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Price Plan</span>
              <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-6">利用料金</h2>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-6xl md:text-7xl font-black italic text-orange-500">¥2,200</span>
                <span className="text-gray-300 text-lg font-bold">/ 1時間 (税込)</span>
              </div>
              <p className="font-sans text-gray-400 text-sm leading-relaxed mt-4">
                ※商用利用（撮影やセミナー開催等）の場合も同料金でご利用可能です。<br />
                ※延長は30分単位での調整も承っております。お気軽にご相談ください。
              </p>
            </div>
          </div>

          {/* 利用時間カード */}
          <div className="bg-white p-8 md:p-12 shadow-2xl border border-gray-200 flex flex-col justify-between">
            <div>
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest block mb-2">Available Hours</span>
              <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-gray-900 mb-6">利用可能時間</h2>
              
              <div className="space-y-4 font-sans text-gray-800">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="font-bold text-base md:text-lg">平日 (Mon - Fri)</span>
                  <span className="font-black italic text-xl md:text-2xl text-gray-900">9:00 〜 17:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="font-bold text-base md:text-lg">土曜 (Sat)</span>
                  <span className="font-black italic text-xl md:text-2xl text-gray-900">14:00 〜 16:00</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 pb-1">
                  <span className="font-bold text-base md:text-lg">日・祝 (Sun & Holidays)</span>
                  <span className="font-black italic text-lg text-orange-600 bg-orange-50 px-3 py-1">要相談</span>
                </div>
              </div>
            </div>

            <p className="font-sans text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
              ※クラス開講スケジュールにより、ご希望の日時に沿えない場合がございます。
            </p>
          </div>
        </div>
      </section>

      {/* スペースの特徴・設備 */}
      <section className="bg-gray-50 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight text-gray-900">FACILITIES & FEATURES</h2>
            <p className="text-orange-600 font-bold mt-2 tracking-widest uppercase">スペース設備・特徴</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-xl border-t-4 border-orange-600">
              <div className="h-48 relative mb-6 overflow-hidden bg-gray-200">
                <Image
                  src="/image24.jpeg"
                  alt="マットエリア"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-black italic uppercase text-gray-900 mb-2">高品質マットエリア</h3>
              <p className="font-sans text-gray-600 text-sm leading-relaxed">
                衝撃吸収性に優れ、滑りにくい高品質な格子状格闘技マットを敷き詰めています。柔術・グラップリング・ストレッチ等に最適です。
              </p>
            </div>

            <div className="bg-white p-8 shadow-xl border-t-4 border-gray-900">
              <div className="h-48 relative mb-6 overflow-hidden bg-gray-200">
                <Image
                  src="/image12.jpeg"
                  alt="トレーニングマシン"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-black italic uppercase text-gray-900 mb-2">トレーニング機器完備</h3>
              <p className="font-sans text-gray-600 text-sm leading-relaxed">
                ウェイトトレーニングマシンやダンベル等も設置されており、補強トレーニングやパーソナル指導の場としてもご利用いただけます。
              </p>
            </div>

            <div className="bg-white p-8 shadow-xl border-t-4 border-orange-600">
              <div className="h-48 relative mb-6 overflow-hidden bg-gray-200">
                <Image
                  src="/image6.jpeg"
                  alt="シャワールーム・更衣室"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-black italic uppercase text-gray-900 mb-2">清潔な更衣室・シャワー</h3>
              <p className="font-sans text-gray-600 text-sm leading-relaxed">
                男女別更衣室および無料のシャワールームをご利用いただけます。ご利用後のお着替えや身支度も快適に行っていただけます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ご利用用途例 & 注意事項 */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* ご利用用途例 */}
          <div className="bg-white p-10 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-black italic uppercase text-gray-900 mb-6 border-b-2 border-orange-600 pb-2 inline-block">
              Recommended Use
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">主なご利用用途</p>
            <ul className="space-y-4 font-sans text-gray-700">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-600 inline-block"></span>
                <span>パーソナルトレーナーのセッション指導場所として</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-600 inline-block"></span>
                <span>格闘技・ダンス・ヨガなどの個人の自主練習</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-600 inline-block"></span>
                <span>格闘技テクニックセミナー・ワークショップの開催</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-600 inline-block"></span>
                <span>YouTubeやSNS動画・スチール写真の撮影場所として</span>
              </li>
            </ul>
          </div>

          {/* ご利用にあたっての注意事項 */}
          <div className="bg-white p-10 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-black italic uppercase text-gray-900 mb-6 border-b-2 border-orange-600 pb-2 inline-block">
              Precautions
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">ご利用上のご注意</p>
            <ul className="space-y-3 font-sans text-gray-600 text-sm leading-relaxed">
              <li>・マット上での土足は厳禁となります（裸足または格闘技専用シューズをご使用ください）。</li>
              <li>・大音量での音楽再生や、極端な騒音・大声は近隣のご迷惑となりますのでお控えください。</li>
              <li>・使用後のゴミはお持ち帰りいただくか、指定のゴミ箱へ分別してお捨ていただくようお願いいたします。</li>
              <li>・ご利用時間内に準備および原状復帰（清掃）を含めて退室をお願いいたします。</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ご予約・お問い合わせ CTA */}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <div className="bg-black text-white p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight mb-4">
              RESERVE YOUR <span className="text-orange-600">SPACE</span>
            </h2>
            <p className="font-sans text-gray-300 max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              レンタルスペースのご予約、空き状況の照会、日祝のご相談などは、下記のお問い合わせフォームより承っております。
            </p>
            <Link
              href="/contact"
              className="inline-block bg-orange-600 text-white px-12 py-5 font-bold text-lg hover:bg-white hover:text-black transition-all uppercase italic shadow-2xl"
            >
              レンタルスペースのお問い合わせ・ご予約 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
