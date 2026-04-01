
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ショップ情報',
    description: 'マーシャルワールド/ALMAの直営店舗情報（大阪、博多、札幌）。格闘技用品の購入はこちら。',
};

const shops = [
    {
        area: 'OSAKA',
        name: 'マーシャルワールド/ALMA 大阪店',
        zip: '541-0051',
        address: '大阪府大阪市中央区備後町3丁目1-6 船場アルファビル 2階',
        tel: '06-4963-2224',
        fax: '06-4963-2229',
        hours: [
            { label: '月～金', value: '10:00～18:00' },
            { label: '土', value: '10:00～16:00' },
        ],
        closed: '日曜日、祝日、夏季、年末年始',
        access: '大阪メトロ本町駅1番出口から徒歩4分(約300m)',
        note: '※現金の取り扱いはございませんので、キャッシュレス決済のみとなります。',
        mapQuery: '大阪府大阪市中央区備後町3-1-6',
    },
    {
        area: 'HAKATA',
        name: 'マーシャルワールド/ALMA 博多店',
        zip: '812-0022',
        address: '福岡県福岡市博多区神屋町6-18 神屋ビル101号',
        tel: '092-283-1955',
        fax: '092-283-1956',
        hours: [
            { label: '営業時間', value: '10:00～18:00' },
        ],
        closed: '夏季、年末年始',
        closedNote: '※ 土日祭日は大会出店のため営業時間短縮・店舗休業日となる場合がございます。詳細は、カレンダーにてご確認ください。',
        access: '地下鉄箱崎線「呉服町」駅 6番出口 徒歩11分',
        mapQuery: '福岡県福岡市博多区神屋町6-18',
    },
    {
        area: 'SAPPORO',
        name: 'マーシャルワールド/ALMA 札幌店',
        zip: '001-0907',
        address: '北海道札幌市北区新琴似7条9-5-15 七番街ビル2F',
        tel: '011-776-6830',
        fax: '011-776-6863',
        hours: [
            { label: '営業時間', value: '11:00～18:00' },
        ],
        closed: '夏季、年末年始、不定休',
        closedNote: '※ 休みに関しましては、twitterにて随時告知いたします。あわせて、カレンダーもご確認ください。',
        access: '地下鉄南北線麻生駅から北海道中央バス[16]花川５丁目経由石狩庁舎前行に乗車、新琴似8条9丁目で下車後徒歩２分',
        mapQuery: '北海道札幌市北区新琴似7条9-5-15',
    },
];

export default function ShopPage() {
    return (
        <div className="pt-32 pb-20 font-[family-name:var(--font-oswald)]">
            {/* ヒーローセクション */}
            <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
                {/* 背景タイポグラフィ */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
                    <span className="text-[12rem] md:text-[22rem] font-black italic leading-none uppercase tracking-tighter">
                        SHOP
                    </span>
                </div>

                <div className="relative z-10">
                    <div className="border-l-8 border-orange-600 pl-6 mb-12">
                        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
                            SHOP <span className="text-orange-600">INFO</span>
                        </h1>
                        <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">店舗情報</p>
                    </div>
                </div>
            </section>

            {/* 店舗一覧 */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="grid gap-20">
                    {shops.map((shop) => (
                        <div key={shop.name} className="flex flex-col lg:flex-row gap-12 border-b border-gray-100 pb-20 last:border-0 last:pb-0">

                            {/* マップ (左or上) */}
                            <div className="w-full lg:w-1/2 order-1 lg:order-2">
                                <div className="w-full aspect-video lg:h-full bg-gray-100 shadow-xl border border-gray-200 p-2">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(shop.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                        title={`${shop.name} Map`}
                                        className="w-full h-full grayscale-[0.2] contrast-[1.1]"
                                    ></iframe>
                                </div>
                            </div>

                            {/* 情報 (右or下) -> デザイン的に左に情報を置いたほうが読みやすいので、order-1にする */}
                            <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
                                <div>
                                    <span className="text-orange-600 font-black italic text-xl md:text-2xl uppercase tracking-widest block mb-1">
                                        {shop.area}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-gray-900 leading-tight">
                                        {shop.name}
                                    </h2>
                                </div>

                                <div className="space-y-6 text-sm md:text-base font-sans">
                                    {/* アドレス */}
                                    <div>
                                        <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-1">Address</h3>
                                        <p className="font-medium">
                                            〒{shop.zip}<br />
                                            {shop.address}
                                        </p>
                                    </div>

                                    {/* 連絡先 */}
                                    <div className="flex flex-col sm:flex-row gap-8">
                                        <div>
                                            <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-1">Tel</h3>
                                            <a href={`tel:${shop.tel.replace(/-/g, '')}`} className="text-xl font-bold font-[family-name:var(--font-oswald)] hover:text-orange-600 transition-colors">
                                                {shop.tel}
                                            </a>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-1">Fax</h3>
                                            <p className="text-xl font-bold font-[family-name:var(--font-oswald)]">
                                                {shop.fax}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 営業時間 */}
                                    <div>
                                        <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-1">Hours</h3>
                                        <div className="space-y-1">
                                            {shop.hours.map((h, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <span className="font-bold min-w-[60px]">{h.label}</span>
                                                    <span>{h.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 定休日 */}
                                    <div>
                                        <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-1">Closed</h3>
                                        <p className="font-medium">{shop.closed}</p>
                                        {shop.closedNote && (
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                {shop.closedNote}
                                            </p>
                                        )}
                                    </div>

                                    {/* アクセス */}
                                    <div>
                                        <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-1">Access</h3>
                                        <p className="font-medium leading-relaxed">{shop.access}</p>
                                    </div>

                                    {/* 備考（キャッシュレスなど） */}
                                    {shop.note && (
                                        <div className="bg-gray-50 p-4 border-l-4 border-orange-600">
                                            <p className="text-sm font-bold text-gray-700">
                                                {shop.note}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}
