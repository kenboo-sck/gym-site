import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "プライバシーポリシー",
    description: "ALMA FIGHT GYM OSAKA HONMACHIのプライバシーポリシー（個人情報保護方針）についてのご案内です。",
};

export default function PrivacyPolicy() {
    return (
        <div className="bg-white min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto font-sans">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-black mb-4 uppercase font-[family-name:var(--font-oswald)]">
                        Privacy Policy
                    </h1>
                    <div className="w-20 h-1.5 bg-orange-600 mx-auto"></div>
                    <p className="mt-6 text-gray-500 text-sm">プライバシーポリシー（個人情報保護方針）</p>
                </div>

                <div className="space-y-10 text-gray-800 leading-relaxed">
                    <section>
                        <p className="mb-4">
                            ALMA FIGHT GYM OSAKA HONMACHI（以下「当ジム」）は、お客様の個人情報の重要性を認識し、その保護を徹底するために、以下のプライバシーポリシーを定めています。当ジムの提供するサービスをご利用いただく際、本ポリシーにご同意いただいたものとみなされます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">1. 個人情報の収集について</h2>
                        <p>当ジムは、適法かつ公正な手段によって個人情報を収集します。主に以下の場合に個人情報を収集することがあります。</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>入会申込み、体験レッスンのご予約時</li>
                            <li>お問い合わせフォームからのご連絡時</li>
                            <li>イベントやキャンペーンへの参加申し込み時</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">2. 利用目的について</h2>
                        <p>収集した個人情報は、以下の目的のために利用し、それ以外の目的での利用はいたしません。</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>サービスの提供および運営（会員管理、予約管理等）</li>
                            <li>お問い合わせに対する回答および本人確認</li>
                            <li>キャンペーン、新サービス、イベント等のご案内（同意を得た場合に限る）</li>
                            <li>サービスの改善や新サービスの開発のための分析</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">3. 個人情報の第三者提供について</h2>
                        <p>当ジムは、次の場合を除き、個人情報を第三者に提供することはありません。</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>ご本人の同意がある場合</li>
                            <li>法令に基づき提供を求められた場合</li>
                            <li>人の生命、身体または財産の保護のために必要があり、本人の同意を得ることが困難な場合</li>
                            <li>利用目的の達成に必要な範囲内で、業務委託先に個人情報を預託する場合（この場合、委託先に対して厳正な管理を求めます）</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">4. 安全管理措置</h2>
                        <p>当ジムは、お預かりした個人情報の漏洩、滅失または毀損の防止、その他個人情報の安全管理のために、必要かつ適切な措置を講じます。</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">5. 個人情報の開示・訂正・利用停止について</h2>
                        <p>お客様ご本人から個人情報の開示、訂正、追加、削除または利用の停止を求められた場合は、ご本人であることを確認の上、速やかに対応いたします。</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">6. お問い合わせ窓口</h2>
                        <p>当ジムの個人情報の取り扱いに関するお問い合わせは、以下の窓口までご連絡ください。</p>
                        <div className="bg-gray-50 p-6 mt-4 border border-gray-100 italic">
                            <p className="font-bold">ALMA FIGHT GYM OSAKA HONMACHI</p>
                            <p>〒541-0051 大阪市中央区備後町3-1-6 船場アルファビル 2F</p>
                            <p>TEL: 06-4256-2912</p>
                        </div>
                    </section>

                    <section className="text-sm text-gray-500 pt-10 border-t border-gray-100">
                        <p>制定日：2026年2月1日</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
