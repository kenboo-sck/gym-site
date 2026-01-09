"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function BeginnersPage() {
  return (
    <div className="pt-32 pb-20 font-[family-name:var(--font-oswald)]">
      {/* ヒーローセクション */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="border-l-8 border-orange-600 pl-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
            FOR <span className="text-orange-600">BEGINNERS</span>
          </h1>
          <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">初めての方へ</p>
        </div>
        
        <div className="relative aspect-[4/5] md:aspect-[21/9] w-full overflow-hidden shadow-2xl mb-12 bg-black">
          <Image
            src="/oh-1001.jpg" 
            alt="Beginners Welcome"
            fill
            className="object-cover opacity-60 md:opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent flex items-end md:items-center">
            <div className="p-8 md:p-12 text-white max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black italic mb-4 md:mb-6 uppercase leading-tight">格闘技未経験でも<br />大丈夫。</h2>
              <p className="text-sm md:text-lg font-sans leading-relaxed opacity-90">
                当ジムでは、会員様の約8割が未経験からのスタートです。
                体力に自信がない方、運動習慣を身につけたい方、新しい趣味を見つけたい方。
                一人ひとりのペースに合わせて、プロのインストラクターが丁寧にサポートします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ブラジリアン柔術とは */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="border-l-8 border-orange-600 pl-6">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">
              WHAT IS <span className="text-orange-600">BJJ?</span>
            </h2>
            <p className="text-gray-400 font-bold tracking-widest uppercase text-sm mb-8">ブラジリアン柔術とは</p>
            <div className="font-sans text-gray-700 leading-relaxed space-y-4">
              <p>
                ブラジリアン柔術（BJJ）は、打撃のない「組み技」主体の格闘技です。
                テコの原理や解剖学的な知識を利用して相手を制する技術体系を持っており、
                「護身術」としての側面と「競技スポーツ」としての側面を併せ持っています。
              </p>
              <p>
                力任せではなくテクニックで解決するため、老若男女問わず、
                小柄な人が大柄な人を制することも可能な「最も効率的な格闘技」と言われています。
              </p>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden shadow-xl">
            <Image src="/oh-04.jpg" alt="BJJ" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* 始めるとハマる人が多い理由 */}
      <section className="bg-black text-white py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight">WHY IT'S ADDICTIVE</h2>
            <p className="text-orange-600 font-bold mt-2 tracking-widest">始めるとハマる人が多い理由</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-orange-600 text-5xl font-black italic mb-4">01</div>
              <h3 className="text-xl font-bold mb-4">知的な興奮「体を使ったチェス」</h3>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                力ではなく、パズルを解くようにテクニックを組み合わせて相手を制する感覚は、他のスポーツでは味わえない知的な快感があります。
              </p>
            </div>
            <div className="text-center">
              <div className="text-orange-600 text-5xl font-black italic mb-4">02</div>
              <h3 className="text-xl font-bold mb-4">日常を忘れる圧倒的な没入感</h3>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                スパーリング中は余計なことを考える余裕がありません。この「今、ここ」に集中する時間が、最高のリフレッシュになります。
              </p>
            </div>
            <div className="text-center">
              <div className="text-orange-600 text-5xl font-black italic mb-4">03</div>
              <h3 className="text-xl font-bold mb-4">大人になってからの「成長」</h3>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                帯の昇級制度など、自分の成長が目に見えてわかる仕組みがあります。昨日できなかったことができるようになる喜びは格別です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* こんな人におすすめ */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="border-l-8 border-orange-600 pl-6 mb-12">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
            RECOMMENDED <span className="text-orange-600">FOR YOU</span>
          </h2>
          <p className="text-gray-400 font-bold mt-4 tracking-widest uppercase text-sm">こんな人におすすめ</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { 
              image: "/rc-0001.png", 
              title: "運動不足を解消したい方",
              text: "ジムのランニングマシンは続かない...そんな方にこそ格闘技がおすすめ。目標を持って楽しく体を動かせるので、自然と運動習慣が身につきます。週2-3回の練習で、確実に体力がついていくのを実感できます。"
            },
            { 
              image: "/rc-0002.png", 
              title: "新しい仲間を作りたい方",
              text: "仕事や学校以外の「サードプレイス」が欲しい。年齢や職業を超えた仲間との出会いが待っています。練習後の雑談や、月1回の親睦会など、コミュニティとしての楽しみも充実しています。"
            },
            { 
              image: "/rc-0003.png", 
              title: "護身術を身につけたい方",
              text: "単なるダイエットではなく、一生使える技術を習得。万が一の時に自分や大切な人を守る力になります。ブラジリアン柔術は、実戦で使える最も効率的な護身術として世界中で認められています。"
            },
            { 
              image: "/rc-0004.png", 
              title: "ストレス発散したい方",
              text: "仕事や人間関係のストレスを健全な形で発散。スパーリングで汗を流せば、心も体もスッキリ。格闘技特有の集中力は、日常の悩みを忘れさせてくれる最高のリフレッシュになります。"
            },
            { 
              image: "/oh-1001.jpg", 
              title: "自分を変えたい方",
              text: "何か新しいことに挑戦して、今の自分を変えたい。格闘技を通じて、肉体的な変化だけでなく、精神的な成長も得られます。「できない」が「できる」に変わる瞬間の喜びは、人生を変えるきっかけになります。"
            },
            { 
              image: "/oh-1002.png", 
              title: "格闘技に興味はあるけど不安な方",
              text: "怪我や痛いのが怖い...その気持ちはよくわかります。当ジムでは安全第一で、防具の着用や段階的な指導を徹底。初心者同士での練習から始めるので、自分のペースで無理なく楽しめます。"
            },
            { 
              image: "/rc-0005.png", 
              title: "子供の習い事を探している方",
              text: "お子様の体力づくりと礼儀作法の習得に最適。いじめ対策や自信をつけることにも繋がります。キッズクラスでは、遊びの要素を取り入れながら、楽しく格闘技の基礎を学べます。"
            },
            { 
              image: "/rc-0006.png", 
              title: "女性で格闘技を始めたい方",
              text: "女性会員も多数在籍。女性専用の更衣室やシャワー完備で安心。ダイエット目的、護身目的、趣味として...それぞれの目的に合わせた指導を受けられます。清潔な環境で気持ちよくトレーニングできます。"
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex gap-6 p-6">
                {/* 画像部分 */}
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* テキスト部分 */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALMA FIGHT GYM はこんなところです */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-square overflow-hidden shadow-2xl">
            <Image src="/hm-t-07.png" alt="Gym Atmosphere" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <div className="border-l-8 border-orange-600 pl-6 mb-8">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">
                ABOUT <span className="text-orange-600">OUR GYM</span>
              </h2>
              <p className="text-gray-400 font-bold tracking-widest uppercase text-sm">ALMA FIGHT GYM はこんなところです</p>
            </div>
            <div className="font-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                ALMA FIGHT GYM は、格闘技を通じて「人生をより豊かにすること」を目的としたコミュニティです。
                プロを目指す方だけでなく、趣味として楽しむ一般の方や、お子様まで、
                誰もが主役になれる場所を目指しています。
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 font-bold">01</div>
                  <div>
                    <h4 className="font-bold text-gray-900">清潔で開放的なトレーニング環境</h4>
                    <p className="text-sm text-gray-500">毎日清掃・除菌を徹底。女性や初心者の方でも気持ちよく過ごせる空間作りを心がけています。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 font-bold">02</div>
                  <div>
                    <h4 className="font-bold text-gray-900">初心者専用カリキュラム</h4>
                    <p className="text-sm text-gray-500">いきなり激しい練習はしません。まずは基本の動きから、一人ひとりの体力に合わせて指導します。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 font-bold">03</div>
                  <div>
                    <h4 className="font-bold text-gray-900">アットホームなコミュニティ</h4>
                    <p className="text-sm text-gray-500">「格闘技ジム＝怖い」というイメージを覆す、明るくフレンドリーな雰囲気が自慢です。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ステップセクション */}
      <section className="bg-gray-50 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black italic uppercase tracking-tight">How to Start</h2>
            <p className="text-orange-600 font-bold mt-2 tracking-widest">ご利用開始までの流れ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "体験予約",
                desc: "WEBサイトの予約フォーム、またはお電話にて体験レッスンのご予約をお願いします。ご希望のクラスや日時をお選びいただけます。",
              },
              {
                step: "02",
                title: "体験レッスン",
                desc: "当日は動きやすい服装でお越しください。インストラクターが基本から丁寧にレクチャーします。ジムの雰囲気もぜひ体感してください。",
              },
              {
                step: "03",
                title: "ご入会手続き",
                desc: "内容にご納得いただけましたら、入会のお手続きとなります。必要な書類や費用については、当日スタッフよりご案内いたします。",
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                <div className="text-7xl font-black italic text-gray-100 absolute top-4 right-6 group-hover:text-orange-50 transition-colors">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black italic uppercase mb-6 border-b-2 border-orange-600 pb-2 inline-block">{item.title}</h3>
                  <p className="text-gray-600 font-sans leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 持ち物セクション */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black italic uppercase tracking-tight mb-8">What to Bring</h2>
            <p className="text-orange-600 font-bold mb-6 tracking-widest">体験当日の持ち物</p>
            <ul className="space-y-4 font-sans text-gray-700">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-600"></span>
                動きやすい服装（Tシャツ、ハーフパンツなど）
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-600"></span>
                タオル
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-600"></span>
                水分補給用の飲み物
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-600"></span>
                着替え（シャワーをご利用の場合）
              </li>
            </ul>
            <p className="mt-8 text-sm text-gray-400 italic">※柔術着のレンタルもございます。お気軽にお申し付けください。</p>
          </div>
          <div className="relative aspect-square overflow-hidden shadow-2xl">
            <Image
              src="/rc-0007.png"
              alt="Gear"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-black p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-8 tracking-tighter">
              Start Your <span className="text-orange-600">Journey</span>
            </h2>
            <p className="text-gray-400 font-sans max-w-xl mx-auto mb-12 text-lg">
              まずは一度、体験レッスンでジムの雰囲気を感じてみませんか？<br />
              スタッフ一同、あなたのお越しを心よりお待ちしております。
            </p>
            <Link 
              href="/reservation" 
              className="inline-block bg-orange-600 text-white px-12 py-5 font-bold text-xl hover:bg-orange-500 transition-all shadow-2xl shadow-orange-900/40"
            >
              体験レッスンを予約する
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}