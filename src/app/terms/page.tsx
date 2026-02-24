import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "利用規約",
    description: "ALMA FIGHT GYM OSAKA HONMACHIのサービス利用規約に関するご案内です。",
};

export default function TermsOfService() {
    return (
        <div className="bg-white min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto font-sans">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-black mb-4 uppercase font-[family-name:var(--font-oswald)]">
                        Terms of Service
                    </h1>
                    <div className="w-20 h-1.5 bg-orange-600 mx-auto"></div>
                    <p className="mt-6 text-gray-500 text-sm">利用規約</p>
                </div>

                <div className="space-y-10 text-gray-800 leading-relaxed">
                    <section>
                        <p className="mb-4">
                            この利用規約（以下「本規約」）は、ALMA FIGHT GYM OSAKA HONMACHI（以下「当ジム」）が提供するサービス（以下「本サービス」）の利用条件を定めるものです。ご利用の皆様（以下「会員」）には、本規約に従って本サービスをご利用いただきます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">第1条（適用）</h2>
                        <p>本規約は、会員と当ジムとの間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">第2条（入会登録・会費）</h2>
                        <ul className="list-decimal ml-6 mt-2 space-y-2">
                            <li>入会希望者が当ジムの定める方法によって入会登録を申請し、当ジムがこれを承認することによって、入会登録が完了するものとします。</li>
                            <li>会員は、当ジムが別途定める会費、入会金等を当ジムが指定する方法により支払うものとします。</li>
                            <li>一度納入された会費等は、法令の定めがある場合を除き、原則として返還いたしません。</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">第3条（禁止事項）</h2>
                        <p>会員は、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>他の会員、第三者、または当ジムを誹謗中傷する行為</li>
                            <li>暴力行為、または強迫行為</li>
                            <li>当ジムの施設・備品を故意に破損する行為</li>
                            <li>他の会員の施設利用を妨げるような行為</li>
                            <li>法令または公序良俗に違反する行為</li>
                            <li>その他、当ジムが不適切と判断する行為</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">第4条（利用制限および登録抹消）</h2>
                        <p>当ジムは、会員が以下のいずれかに該当する場合には、事前の通知なく、本サービスの利用を制限し、または会員としての登録を抹消することができるものとします。</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>本規約のいずれかの条項に違反した場合</li>
                            <li>会費等の支払債務の不履行があった場合</li>
                            <li>その他、当ジムが本サービスの利用を適当でないと判断した場合</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">第5条（免責事項）</h2>
                        <ul className="list-decimal ml-6 mt-2 space-y-2">
                            <li>当ジムは、施設内での盗難、紛失、怪我等について、当ジムに故意または重過失がある場合を除き、一切の責任を負いません。</li>
                            <li>当ジムは、本規約の変更、本サービスの停止、終了、利用不能等により会員が被った損害について、一切の責任を負いません。</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">第6条（規約の変更）</h2>
                        <p>当ジムは、必要と判断した場合には、会員に通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該会員は変更後の規約に同意したものとみなします。</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-l-4 border-orange-600 pl-4 mb-4 text-black">第7条（準拠法・裁判管轄）</h2>
                        <p>本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当ジムの所在地を管轄する裁判所を専属的合意管轄とします。</p>
                    </section>

                    <section className="text-sm text-gray-500 pt-10 border-t border-gray-100">
                        <p>制定日：2026年2月1日</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
