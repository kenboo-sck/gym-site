"use client";

import Image from 'next/image';
import Link from 'next/link';

const classCategories = [
  {
    category: "GRAPPLING",
    sub: "ブラジリアン柔術・グラップリング",
    classes: [
      {
        title: "BJJ Basic",
        en: "Fundamentals",
        desc: "ブラジリアン柔術の土台となる基本動作や護身術を学ぶ、初心者・未経験者向けのクラスです。マット運動やエビ（基本動作）から始まり、安全な受け身、基本的な抑え込みや脱出方法を丁寧に指導します。運動経験がない方でも、自分のペースで着実にステップアップできるカリキュラムです。",
        image: "/oh-04.jpg",
        recommended: ["格闘技未経験の方", "運動不足を解消したい方", "護身術を身につけたい方"]
      },
      {
        title: "BJJ Advanced",
        en: "High Level Tech",
        desc: "ベーシッククラスで習得した基礎を応用し、より実戦的で高度なテクニックを追求するクラスです。最新の競技シーンで使われるモダンなガードワークや、複雑なサブミッションの連動、スパーリングにおける戦略的なポジショニングを深く掘り下げます。青帯以上の方や、さらなる高みを目指す白帯の方に最適です。",
        image: "/oh-1001.jpg",
        recommended: ["試合出場を目指す方", "より深い技術を学びたい方", "スパーリングを楽しみたい方"]
      },
      {
        title: "BJJ Kids",
        en: "Next Generation",
        desc: "遊びの要素を取り入れたトレーニングを通じて、運動能力の向上と格闘技の楽しさを伝えるキッズ専用クラスです。技術の習得はもちろん、道場での挨拶や礼儀作法、仲間を尊重する心を育みます。いじめに負けない強い心と体、そして困難に立ち向かう集中力を養うことを目的としています。",
        image: "/rc-0005.png",
        recommended: ["礼儀作法を身につけさせたい", "体力を向上させたい", "自信をつけさせたい"]
      },
      {
        title: "No-Gi",
        en: "Submission Wrestling",
        desc: "道着を着用せず、ラッシュガードやショーツで行うグラップリング（組技）クラスです。道着のグリップがないため、よりスピード感のある展開や、レスリング技術を活かしたテイクダウン、タイトなコントロールが求められます。MMA（総合格闘技）への応用も高く、ダイナミックな動きを楽しみたい方におすすめです。",
        image: "/mma-hero.png",
        recommended: ["MMAに興味がある方", "スピード感のある動きを好む方", "レスリング技術を学びたい方"]
      }
    ]
  },
  {
    category: "STRIKING & MMA",
    sub: "打撃・総合格闘技",
    classes: [
      {
        title: "Kickboxing Basic",
        en: "Striking Foundation",
        desc: "パンチやキックの正しいフォーム、ミット打ちの楽しさを体験できる初心者向けクラスです。全身を連動させた動きで効率よくカロリーを消費し、ストレス解消やシェイプアップにも最適です。対人戦（スパーリング）は行わず、安全に楽しく汗を流すことを優先した内容になっています。",
        image: "/kick-hero.png",
        recommended: ["楽しくダイエットしたい方", "ストレス発散したい方", "キックの基本を学びたい方"]
      },
      {
        title: "MMA Basic",
        en: "Mixed Martial Arts",
        desc: "打撃・投げ・寝技が融合した総合格闘技（MMA）の基礎を学ぶクラスです。ケージ（金網）際での攻防や、打撃からタックルへの繋ぎなど、MMA特有の技術を体系的に指導します。複雑に見えるMMAの動きを分解して解説するため、格闘技未経験からでも安心してスタートできます。",
        image: "/mma-01.png",
        recommended: ["総合的に強くなりたい方", "ケージでの攻防を学びたい方", "新しい刺激が欲しい方"]
      }
    ]
  },
  {
    category: "OTHERS",
    sub: "フリートレーニング",
    classes: [
      {
        title: "Free Training",
        en: "Open Mat",
        desc: "指導員の見守りのもと、各自が自由に練習を行う時間です。クラスで習った技の復習や打ち込み、スパーリング、あるいは個別の体力トレーニングなど、自分の課題に合わせて活用いただけます。会員同士のコミュニケーションの場としても人気があり、自主性を重んじる時間です。",
        image: "/oh-1001.jpg",
        recommended: ["自分のペースで練習したい方", "技の復習をしたい方", "仲間と交流したい方"]
      }
    ]
  }
];

export default function ClassPage() {
  return (
    <div className="pt-32 pb-20 font-[family-name:var(--font-oswald)]">
      {/* ヒーローセクション */}
      <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
        {/* 背景タイポグラフィ */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
          <span className="text-[12rem] md:text-[22rem] font-black italic leading-none uppercase tracking-tighter">
            DISCIPLINE
          </span>
        </div>

        <div className="relative z-10">
          <div className="border-l-8 border-orange-600 pl-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
              OUR <span className="text-orange-600">CLASSES</span>
            </h1>
            <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">クラス紹介</p>
          </div>
          <div className="w-full animate-in fade-in slide-in-from-left-4 duration-1000 relative">
            <p className="text-4xl md:text-6xl font-black italic leading-none text-gray-900 uppercase tracking-tighter mb-6">
              Unlock your potential.
            </p>
            <p className="text-gray-500 font-bold leading-relaxed text-base md:text-xl">
              未経験者からアスリートまで、すべてのレベルに対応した専門プログラム。強さを追求するだけでなく、健康維持やストレス解消など、あなたのライフスタイルに合わせた最適なプログラムを準備しております。
            </p>
          <div className="mt-8">
            <Link 
              href="/schedule" 
              className="inline-block border-b-2 border-orange-600 pb-1 font-bold italic uppercase tracking-widest text-sm text-orange-600 hover:text-black hover:border-black transition-colors"
            >
              Check Schedule →
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* カテゴリー別クラス一覧 */}
      {classCategories.map((cat, idx) => (
        <section key={idx} className={`py-24 ${idx % 2 === 1 ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                {cat.category}
              </h2>
              <p className={`font-bold mt-2 tracking-widest uppercase text-sm ${idx % 2 === 1 ? 'text-orange-500' : 'text-orange-600'}`}>
                {cat.sub}
              </p>
            </div>

            <div className="flex flex-col gap-24">
              {cat.classes.map((cls, cIdx) => (
                <div key={cIdx} className="group flex flex-col md:flex-row gap-12 items-start">
                  <div className="relative w-full md:w-5/12 aspect-[4/3] overflow-hidden shadow-2xl">
                    <Image
                      src={cls.image}
                      alt={cls.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                    <div className="absolute bottom-4 left-6 md:hidden">
                      <h3 className="text-2xl font-black italic text-white uppercase">{cls.title}</h3>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-7/12">
                    <div className="hidden md:block mb-2">
                      <span className={`text-xs font-bold tracking-[0.3em] uppercase ${idx % 2 === 1 ? 'text-gray-500' : 'text-gray-400'}`}>
                        {cls.en}
                      </span>
                      <h3 className="text-3xl font-black italic uppercase leading-none mt-1">
                        {cls.title}
                      </h3>
                    </div>
                    <p className={`font-sans leading-relaxed text-base md:text-lg mb-8 ${idx % 2 === 1 ? 'text-gray-400' : 'text-gray-600'}`}>
                      {cls.desc}
                    </p>
                    
                    {/* こんな方にお勧めセクション */}
                    <div className={`p-6 ${idx % 2 === 1 ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <h4 className={`text-sm font-black italic uppercase mb-4 tracking-widest ${idx % 2 === 1 ? 'text-orange-500' : 'text-orange-600'}`}>
                        こんな方にお勧め
                      </h4>
                      <ul className="grid grid-cols-1 gap-3">
                        {cls.recommended?.map((item, rIdx) => (
                          <li key={rIdx} className="flex items-center gap-3 text-sm font-bold italic">
                            <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center text-[10px] ${idx % 2 === 1 ? 'bg-orange-500 text-black' : 'bg-orange-600 text-white'}`}>✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 下部CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-orange-600 p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-200">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-8 tracking-tighter">
              Ready to <span className="text-black">Train?</span>
            </h2>
            <p className="font-sans max-w-xl mx-auto mb-12 text-lg opacity-90">
              すべてのクラスで初心者・未経験者の方を歓迎しています。<br />
              まずはスケジュールを確認して、気になるクラスの体験予約へお進みください。
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link href="/schedule" className="bg-black text-white px-10 py-4 font-bold text-lg hover:bg-white hover:text-black transition-all uppercase italic">
                スケジュールを見る
              </Link>
              <Link href="/reservation" className="bg-white text-orange-600 px-10 py-4 font-bold text-lg hover:bg-black hover:text-white transition-all uppercase italic">
                まずは体験から
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}