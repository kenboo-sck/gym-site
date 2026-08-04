"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: '初めての方へ', en: 'BEGINNERS', href: '/beginners' },
  { name: 'クラス紹介', en: 'CLASS', href: '/class' },
  { name: '入会案内・料金プラン', en: 'MEMBERSHIP', href: '/membership' },
  { name: 'スケジュール', en: 'SCHEDULE', href: '/schedule' },
  { name: 'インストラクター', en: 'INSTRUCTORS', href: '/instructors' },
  { name: 'ショップ情報', en: 'SHOP INFO', href: '/shop' },
  { name: 'レンタルスペース', en: 'RENTAL', href: '/rental' },
  { name: 'よくある質問', en: 'FAQ', href: '/faq' },
  { name: 'アクセス', en: 'ACCESS', href: '/access' },
  { name: '問合せ', en: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-100 font-sans">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between relative z-50 bg-white">

        {/* ロゴ部分 */}
        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo_t.svg"
            alt="ALMA FIGHT GYM ロゴ"
            width={160}
            height={40}
            className="object-contain invert"
          />
        </Link>

        {/* ナビゲーション */}
        <nav className="hidden xl:flex gap-3 2xl:gap-5 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center leading-tight"
            >
              <span className="font-[family-name:var(--font-oswald)] text-sm 2xl:text-base font-black italic tracking-wider text-gray-900 group-hover:text-orange-600 transition-colors">
                {item.en}
              </span>
              {/* 日本語：斜体で小さく（下） */}
              <span className="text-[9px] italic font-bold text-gray-400 group-hover:text-orange-500 transition-colors mt-0">
                {item.name}
              </span>
            </Link>
          ))}

          <a
            href="https://picro.jp/sports/almafight/trials/entry/3284"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 bg-black text-white px-4 py-3 text-xs 2xl:text-sm font-black italic hover:bg-orange-600 transition-all duration-300 shadow-md whitespace-nowrap"
          >
            体験予約
          </a>
        </nav>

        {/* ハンバーガーボタン (Mobile) */}
        <button
          className="xl:hidden flex flex-col gap-1.5 z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニューを開く"
        >
          <span className={`w-8 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-8 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-8 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* モバイルメニューオーバーレイ */}
      <div className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out xl:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-32 px-10 pb-10 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex flex-col transition-all duration-500 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
              >
                <span className="font-[family-name:var(--font-oswald)] text-3xl font-black italic tracking-tighter text-white group-hover:text-orange-600 transition-colors uppercase">
                  {item.en}
                </span>
                <span className="text-xs font-bold text-gray-500 group-hover:text-orange-400 transition-colors">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div className={`mt-12 transition-all duration-500 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <a
              href="https://picro.jp/sports/almafight/trials/entry/3284"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-orange-600 text-white text-center py-5 font-black italic text-xl uppercase tracking-widest shadow-2xl shadow-orange-900/20"
            >
              体験予約
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
