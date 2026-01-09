"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

const navItems = [
  { name: '初めての方へ', en: 'BEGINNERS', href: '/beginners' },
  { name: 'クラス紹介', en: 'CLASS', href: '/class' },
  { name: '入会案内', en: 'MEMBERSHIP', href: '/membership' },
  { name: 'お知らせ', en: 'NEWS', href: '/news' },
  { name: 'スケジュール', en: 'SCHEDULE', href: '/schedule' },
  { name: 'インストラクター', en: 'INSTRUCTORS', href: '/instructors' },
  { name: 'アクセス', en: 'ACCESS', href: '/access' },
  { name: '問合せ', en: 'CONTACT', href: '/contact' },
];

const socialLinks = [
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/afg_osaka_honmachi', color: 'hover:text-pink-500' },
  { name: 'X', icon: FaXTwitter, href: 'https://x.com/afg_osaka', color: 'hover:text-white' },
];

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white font-[family-name:var(--font-oswald)]">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo_t.svg" 
                alt="ALMA FIGHT GYM"
                width={160} 
                height={36} 
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 text-sm font-sans leading-relaxed mb-6">
              理想の体と、新しい自分へ。<br />
              初心者からプロ志望まで、本気で変わるなら今。<br />
              まずは体験からスタート！
            </p>
            <Link 
              href="/reservation" 
              className="inline-block bg-orange-600 text-white px-8 py-4 font-black italic text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-orange-900/40"
            >
              体験予約 →
            </Link>
          </div>

          {/* ナビゲーションリンク - オプション2：区切り線付き */}
          <div className="md:col-span-2">
            <h3 className="text-base font-bold tracking-[0.3em] text-orange-600 uppercase mb-6 italic">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-5">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="group flex flex-col pb-3 border-b border-gray-700 hover:border-orange-600 transition-all"
                >
                  <span className="text-lg font-light italic tracking-wider text-white group-hover:text-orange-600 transition-colors uppercase">
                    {item.en}
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-orange-400 transition-colors font-sans mt-1">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-base font-bold tracking-[0.3em] text-orange-600 uppercase mb-6 italic">
              Contact
            </h3>
            <div className="space-y-4 text-sm font-sans">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Address</p>
                <p className="text-gray-300 leading-relaxed">
                  〒541-0051<br />
                  大阪市中央区備後町3-1-6<br />
                  船場アルファビル 2F
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Phone</p>
                <a href="tel:0642562921" className="text-orange-500 hover:text-orange-400 transition-colors font-bold text-lg">
                  06-4256-2921
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Hours</p>
                <p className="text-gray-300 leading-relaxed">
                  平日 17:00 - 22:00<br />
                  土曜 10:00 - 14:00<br />
                  <span className="text-gray-500">定休日：日曜</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mb-8"></div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-base font-bold tracking-[0.3em] text-orange-600 uppercase mb-4 italic">
              Company
            </h3>
            <div className="space-y-2 text-sm font-sans text-gray-300">
              <p className="font-bold text-white">株式会社マーシャルワールドジャパン</p>
              <p>〒541-0051 大阪市中央区備後町3-1-6 アルファビル2階</p>
              <p>TEL : 06-4256-2921</p>
              <Link 
                href="https://your-company-site.com" 
                target="_blank"
                className="inline-block text-orange-500 hover:text-orange-400 transition-colors mt-2 font-bold"
              >
                運営会社サイトはこちら →
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold tracking-[0.3em] text-orange-600 uppercase mb-4 italic">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 flex items-center justify-center text-2xl text-gray-400 transition-all hover:bg-orange-600 hover:text-white hover:scale-110"
                    aria-label={social.name}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 font-sans">
              © {new Date().getFullYear()} ALMA FIGHT GYM. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-wider">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-wider">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-orange-600/70 backdrop-blur-md border border-white/20 text-white w-10 h-10 md:w-14 md:h-14 flex items-center justify-center font-black hover:bg-black transition-all shadow-2xl shadow-orange-600/40 z-40 hover:scale-110 active:scale-95 group animate-fade-in"
          aria-label="トップへ戻る"
        >
          <svg 
            className="w-4 h-4 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}
    </footer>
  );
}