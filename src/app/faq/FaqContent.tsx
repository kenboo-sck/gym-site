"use client";

import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "全くの未経験で運動神経にも自信がありませんが、大丈夫ですか？",
    answer: "はい、全く問題ありません。当ジムに通われている方のほとんどが未経験からのスタートです。個人の体力に合わせて無理のない範囲で進めていきますので、ご安心ください。",
    category: "初心者・体験"
  },
  {
    id: 2,
    question: "40代・50代からでも始められますか？年齢的に体力が不安です。",
    answer: "はい、大歓迎です。当ジムでも40代や50代から格闘技を始められた会員様も多く、ご自身の体力に合わせて楽しまれています。ブラジリアン柔術は「体を使ったチェス」とも呼ばれ、力任せではなくテクニックを重視するため、年齢を問わず長く続けられるのが特徴です。",
    category: "初心者・体験"
  },
  {
    id: 3,
    question: "見学や体験に予約は必要ですか？友達と一緒でも大丈夫ですか？",
    answer: "見学は予約不要ですので、いつでもお気軽にお越しください。体験をご希望の場合は、公式サイトの「無料体験フォーム」より事前にお申し込みをお願いいたします。ご友人やご家族とご一緒の参加も大歓迎です。",
    category: "見学・体験"
  },
  {
    id: 4,
    question: "ダイエット目的や、試合に出るつもりがなくても通えますか？",
    answer: "もちろんです。当ジムでは練習やスパーリングの強制は一切ありません。試合出場も個人の自由ですので、健康維持やダイエット、趣味として自分のペースで楽しんでいただけます。",
    category: "練習・クラス"
  },
  {
    id: 5,
    question: "クラスの時間に遅れたり、途中で帰ったりすることは可能ですか？",
    answer: "途中参加・途中退室ともに可能です。インストラクターに一声お声掛けいただければスムーズに合流いただけます。",
    category: "練習・クラス"
  },
  {
    id: 6,
    question: "何歳から入会できますか？",
    answer: "通常クラス（一般クラス）へのご入会は、中学生以上の方を対象としております。",
    category: "入会・条件"
  },
  {
    id: 7,
    question: "シャワーや更衣室はありますか？",
    answer: "はい、男女別の更衣室を完備しております。また、練習後にご利用いただける無料のシャワー室もございます。",
    category: "施設・設備"
  },
  {
    id: 8,
    question: "駐車場や駐輪場はありますか？",
    answer: "専用の駐車場はございませんが、ジムのすぐ目の前にコインパーキングがございます。自転車やバイクは、敷地内に若干数お停めいただけます。",
    category: "施設・設備"
  },
  {
    id: 9,
    question: "他のジムに通っているのですが、掛け持ち（出稽古）は可能ですか？",
    answer: "可能ですが、必ず現在の所属ジムの許可を得てからお越しください。",
    category: "入会・条件"
  }
];

export default function FaqContent() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="pt-32 pb-20 font-[family-name:var(--font-oswald)]">
      {/* ヒーローセクション */}
      <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
        {/* 背景タイポグラフィ */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
          <span className="text-[12rem] md:text-[22rem] font-black italic leading-none uppercase tracking-tighter">
            QUESTIONS
          </span>
        </div>

        <div className="relative z-10">
          <div className="border-l-8 border-orange-600 pl-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
              FREQUENTLY ASKED <span className="text-orange-600">QUESTIONS</span>
            </h1>
            <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">よくある質問 (FAQ)</p>
          </div>
          <p className="font-sans text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed">
            皆様からよく寄せられるご質問と回答をまとめました。<br className="hidden md:inline" />
            ご不明な点がございましたら、お気軽にお問い合わせフォームまたはお電話にてご連絡ください。
          </p>
        </div>
      </section>

      {/* FAQ リスト */}
      <section className="max-w-4xl mx-auto px-6 mb-24 relative z-10">
        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id || openId === null; // デフォルトで展開または開閉可能
            return (
              <div
                key={faq.id}
                className="bg-white border border-gray-200 shadow-md hover:border-orange-500 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-none bg-orange-600 text-white font-black italic text-lg flex items-center justify-center">
                      Q
                    </span>
                    <div>
                      {faq.category && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 mb-2 inline-block font-sans">
                          {faq.category}
                        </span>
                      )}
                      <h3 className="text-lg md:text-xl font-bold font-sans text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-2xl text-orange-600 font-black ml-2">
                    {openId === faq.id ? "−" : "＋"}
                  </span>
                </button>

                {openId === faq.id && (
                  <div className="px-6 pb-6 pt-2 font-sans border-t border-gray-100 bg-gray-50/50 flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-none bg-black text-white font-black italic text-lg flex items-center justify-center">
                      A
                    </span>
                    <p className="text-gray-700 leading-relaxed text-base pt-1">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* お問い合わせ・体験予約への導線 */}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <div className="bg-gray-900 text-white p-12 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight mb-4">
              STILL HAVE <span className="text-orange-600">QUESTIONS?</span>
            </h2>
            <p className="font-sans text-gray-300 max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              疑問点や気になることが解決しなかった場合は、どんな小さなことでもお気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://picro.jp/sports/almafight/trials/entry/3284"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-orange-600 text-white px-10 py-4 font-bold text-lg hover:bg-white hover:text-black transition-all uppercase italic shadow-xl"
              >
                無料体験を予約する →
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto border border-white/30 text-white px-10 py-4 font-bold text-lg hover:bg-white/10 transition-all uppercase italic"
              >
                お問い合わせはこちら
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
