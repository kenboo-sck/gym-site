"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="pt-32 pb-20 font-[family-name:var(--font-oswald)]">
      {/* ヒーローセクション */}
      <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
        {/* 背景タイポグラフィ */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
          <span className="text-[12rem] md:text-[22rem] font-black italic leading-none uppercase tracking-tighter">
            JOIN US
          </span>
        </div>

        <div className="relative z-10">
          <div className="border-l-8 border-orange-600 pl-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
              MEMBERSHIP
            </h1>
            <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">入会案内 / 料金プラン</p>
          </div>
        </div>
      </section>

      {/* キャンペーンセクション */}
      <section className="relative w-full mb-24 overflow-hidden">
        <div className="bg-black py-16 md:py-20 text-white relative flex items-center min-h-[500px]">
          <Image
            src="/rc-0008.png"
            alt="Campaign Background"
            fill
            className="object-cover grayscale opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
            <div className="inline-block bg-orange-600 text-white px-3 py-1 text-[10px] font-bold italic uppercase tracking-widest mb-6">
              Grand Opening Campaign
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-8 tracking-tighter leading-none">
              <span className="text-orange-600">OPENING</span><br />CAMPAIGN
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">Benefit 01</p>
                <p className="text-xl font-black italic">入会金 ¥0</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">Benefit 02</p>
                <p className="text-xl font-black italic">道着プレゼント</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">Benefit 03</p>
                <p className="text-xl font-black italic">月会費 2ヶ月無料</p>
              </div>
            </div>

            <div className="mb-10">
              <p className="text-2xl md:text-3xl font-black italic text-white mb-2">
                先着 <span className="text-orange-600 underline decoration-white underline-offset-4">30名様</span> 限定
              </p>
              <p className="font-sans text-gray-400 max-w-xl leading-relaxed text-sm md:text-base">
                豪華特典をご用意しました。定員に達し次第終了となります。<br />
                <span className="text-[10px] text-gray-500 mt-1 block uppercase tracking-wider">※キャンペーンの適用には6ヶ月間の継続利用が条件となります。6か月以内に解約の場合は実費請求となります。</span>
              </p>
            </div>

            <Link href="/reservation" className="inline-block bg-white text-black px-10 py-4 font-bold text-lg hover:bg-orange-600 hover:text-white transition-all uppercase italic shadow-2xl">
              Book a Trial Now
            </Link>
          </div>
        </div>
      </section>

      {/* 料金セクション */}
      <section className="bg-gray-50 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black italic uppercase tracking-tight">PRICING</h2>
            <p className="text-orange-600 font-bold mt-2 tracking-widest">料金プラン</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 入会金 */}
            <div className="bg-white p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black italic uppercase mb-2">Admission Fee</h3>
                <p className="text-gray-400 text-xs font-bold mb-6">入会金</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black italic">¥11,000</span>
                <span className="text-gray-400 text-[10px] font-bold">(税込)</span>
              </div>
            </div>

            {/* 大人 フルタイム */}
            <div className="bg-white p-8 shadow-xl border-2 border-orange-600 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-1 text-[10px] font-bold uppercase italic tracking-widest">Popular</div>
              <div>
                <h3 className="text-xl font-black italic uppercase mb-2">Adult Full-time</h3>
                <p className="text-gray-400 text-xs font-bold mb-6">大人（フルタイム）</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black italic text-orange-600">¥14,300</span>
                <span className="text-gray-400 text-[10px] font-bold">/ month</span>
              </div>
            </div>

            {/* 大人 月8回 */}
            <div className="bg-white p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black italic uppercase mb-2">Adult 8 Times</h3>
                <p className="text-gray-400 text-xs font-bold mb-6">大人（月8回）</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black italic">¥12,100</span>
                <span className="text-gray-400 text-[10px] font-bold">/ month</span>
              </div>
            </div>

            {/* 女性 */}
            <div className="bg-white p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black italic uppercase mb-2">Women</h3>
                <p className="text-gray-400 text-xs font-bold mb-6">女性</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black italic">¥9,900</span>
                <span className="text-gray-400 text-[10px] font-bold">/ month</span>
              </div>
            </div>

            {/* 学生 */}
            <div className="bg-white p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black italic uppercase mb-2">Student</h3>
                <p className="text-gray-400 text-xs font-bold mb-6">学生（中学生〜）</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black italic">¥9,900</span>
                <span className="text-gray-400 text-[10px] font-bold">/ month</span>
              </div>
            </div>

            {/* キッズ */}
            <div className="bg-white p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black italic uppercase mb-2">Kids</h3>
                <p className="text-gray-400 text-xs font-bold mb-6">キッズ（小学生）</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black italic">¥8,800</span>
                <span className="text-gray-400 text-[10px] font-bold">/ month</span>
              </div>
            </div>

            {/* ビジター */}
            <div className="bg-white p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black italic uppercase mb-2">Visitor</h3>
                <p className="text-gray-400 text-xs font-bold mb-6">ビジター</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black italic">¥5,500</span>
                <span className="text-gray-400 text-[10px] font-bold">/ session</span>
              </div>
            </div>

            {/* ビジター JBJJF */}
            <div className="bg-white p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black italic uppercase mb-2">Visitor (JBJJF)</h3>
                <p className="text-gray-400 text-xs font-bold mb-6">ビジター（JBJJF加盟団体）</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black italic">¥3,300</span>
                <span className="text-gray-400 text-[10px] font-bold">/ session</span>
              </div>
            </div>

            {/* プライベートレッスン */}
            <div className="bg-white p-8 shadow-xl border-2 border-orange-600 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-1 text-[10px] font-bold uppercase italic tracking-widest">Free Trial Available</div>
              <div>
                <h3 className="text-xl font-black italic uppercase mb-2">Private Lesson</h3>
                <p className="text-gray-400 text-xs font-bold mb-4">プライベートレッスン</p>
                <div className="mb-6">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 italic">初回体験：無料</span>
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black italic">¥11,000</span>
                <span className="text-gray-400 text-[10px] font-bold">/ hour (税込)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 入会手続きセクション */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl font-black italic uppercase tracking-tight mb-8">HOW TO JOIN</h2>
            <p className="text-orange-600 font-bold mb-6 tracking-widest">ご入会について</p>
            <p className="font-sans text-gray-600 leading-relaxed mb-8">
              ご入会はオンラインシステム上で完結いたします。
              スマートフォンやPCから簡単にお手続きいただけます。
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
          </div>
          <div className="bg-white p-10 shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-black italic uppercase mb-8 border-b-2 border-orange-600 pb-2 inline-block">Required Items</h3>
            <p className="text-gray-400 font-bold text-[10px] mb-6 uppercase tracking-widest">お手続きに必要なもの</p>
            <ul className="space-y-6 font-sans text-gray-700">
              <li className="flex items-start gap-4">
                <span className="w-6 h-6 bg-orange-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                <div>
                  <p className="font-bold">スマートフォン・PC</p>
                  <p className="text-sm text-gray-500">オンラインシステムにアクセスしてお手続きいただきます。</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-6 h-6 bg-orange-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                <div>
                  <p className="font-bold">本人確認書類</p>
                  <p className="text-sm text-gray-500">運転免許証、保険証、マイナンバーカード等の画像をアップロードします。</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-6 h-6 bg-orange-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                <div>
                  <p className="font-bold">クレジットカード</p>
                  <p className="text-sm text-gray-500">初期費用および月会費のお支払いに必要です。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}