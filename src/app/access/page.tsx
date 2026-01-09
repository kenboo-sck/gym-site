import Link from 'next/link';

export default function AccessPage() {
  return (
    <div className="pt-32 pb-20 font-[family-name:var(--font-oswald)]">
      {/* ヒーローセクション */}
      <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
        {/* 背景タイポグラフィ */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
          <span className="text-[12rem] md:text-[22rem] font-black italic leading-none uppercase tracking-tighter">
            LOCATION
          </span>
        </div>

        <div className="relative z-10">
          <div className="border-l-8 border-orange-600 pl-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
              GYM <span className="text-orange-600">ACCESS</span>
            </h1>
            <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">アクセス</p>
          </div>
        </div>
      </section>

      {/* マップ & 基本情報 */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Google Map */}
          <div className="w-full lg:w-2/3 aspect-video lg:aspect-auto lg:h-[600px] bg-gray-100 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.066847427142!2d135.5003453763261!3d34.68331597292594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e71999999999%3A0x0!2z44CSNTQxLTAwNTEg5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65YKZ5b6M55S677yT77yN77yWIOiIueWgtOOCouODq-ODleOCoeODk-ODqyAyRg!5e0!3m2!1sja!2sjp!4v1710000000000!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gym Location"
              className="invert-[0.9] hue-rotate-[180deg] brightness-[0.9] contrast-[1.2] grayscale-[0.2]"
            ></iframe>
          </div>

          {/* 情報エリア */}
          <div className="w-full lg:w-1/3 space-y-12">
            <div>
              <h2 className="text-2xl font-black italic uppercase mb-6 border-b-2 border-orange-600 pb-2 inline-block">Address</h2>
              <p className="text-gray-900 font-bold text-lg leading-relaxed">
                〒541-0051<br />
                大阪市中央区備後町3-1-6<br />
                船場アルファビル 2F
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black italic uppercase mb-6 border-b-2 border-orange-600 pb-2 inline-block">Contact</h2>
              <div className="space-y-2">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Phone</p>
                <a href="tel:0642562921" className="text-3xl font-black italic text-orange-600 hover:text-black transition-colors">
                  06-4256-2921
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black italic uppercase mb-6 border-b-2 border-orange-600 pb-2 inline-block">Business Hours</h2>
              <div className="space-y-4 font-sans">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-bold">平日 (Mon-Fri)</span>
                  <span className="font-black italic">17:00 - 22:00</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-bold">土曜 (Sat)</span>
                  <span className="font-black italic">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="font-bold">日曜 (Sun)</span>
                  <span className="font-black italic uppercase">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 電車でのアクセス */}
      <section className="bg-gray-50 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black italic uppercase tracking-tight">TRAIN ACCESS</h2>
            <p className="text-orange-600 font-bold mt-2 tracking-widest">最寄り駅からのアクセス</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 shadow-xl border-l-8 border-orange-600">
              <h3 className="text-2xl font-black italic uppercase mb-4">Honmachi Station</h3>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6">御堂筋線「本町駅」</p>
              <p className="text-gray-900 font-bold text-xl italic">
                1番・3番出口より <span className="text-orange-600 text-3xl">徒歩1分</span>
              </p>
            </div>
            <div className="bg-white p-10 shadow-xl border-l-8 border-gray-200">
              <h3 className="text-2xl font-black italic uppercase mb-4">Sakaisuji Honmachi</h3>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6">堺筋線「堺筋本町駅」</p>
              <p className="text-gray-900 font-bold text-xl italic">
                17番出口より <span className="text-gray-400 text-3xl">徒歩5分</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Ready to <span className="text-orange-600">Start?</span>
          </h2>
          <p className="text-gray-500 font-bold italic">見学・体験は随時受け付けております。お気軽にお越しください。</p>
        </div>
        <Link 
          href="/reservation" 
          className="group relative inline-block bg-orange-600 text-white px-12 py-5 hover:bg-black transition-all duration-300 border-r-4 border-orange-400 hover:border-gray-600 shadow-xl"
        >
          <div className="flex flex-col items-start leading-none relative">
            <div className="absolute -left-4 top-0 w-[1px] h-full bg-white/40"></div>
            <span className="text-[10px] font-black tracking-[0.4em] mb-1 opacity-80 uppercase">Free Trial</span>
            <span className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-4">
              クラスを体験する
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}