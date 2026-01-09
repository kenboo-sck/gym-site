"use client";
import { db } from "@/lib/firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    subject: '無料体験申込み',
    experience: '無し',
    contactMethod: 'メール', // 追加：ご希望の連絡方法の初期値
    gender: '回答しない',
    name: '',
    email: '',
    emailConfirm: '',
    phone: '',
    zip: '',
    prefecture: '',
    city: '',
    address: '',
    message: ''
  });

  const [emailError, setEmailError] = useState("");
  const [isConfirm, setIsConfirm] = useState(false); // 確認画面フラグ

  // 郵便番号から住所を検索する関数
  const fetchAddress = async (zipCode: string) => {
    if (zipCode.length === 7) {
      try {
        const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`);
        const data = await res.json();
        if (data.status === 200 && data.results) {
          const result = data.results[0];
          setFormData(prev => ({
            ...prev,
            prefecture: result.address1,
            city: result.address2,
            address: result.address3
          }));
        }
      } catch (error) {
        console.error("住所の取得に失敗しました", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email' || name === 'emailConfirm') {
      const emailVal = name === 'email' ? value : formData.email;
      const confirmVal = name === 'emailConfirm' ? value : formData.emailConfirm;
      if (confirmVal && emailVal !== confirmVal) {
        setEmailError("メールアドレスが一致しません。");
      } else {
        setEmailError("");
      }
    }
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setFormData(prev => ({ ...prev, zip: value }));
    if (value.length === 7) {
      fetchAddress(value);
    }
  };

  // 確認画面へ進む
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email !== formData.emailConfirm) {
      setEmailError("メールアドレスが一致しません。");
      return;
    }
    setIsConfirm(true);
    window.scrollTo(0, 0);
  };

  // 入力画面に戻る
  const handleBack = () => {
    setIsConfirm(false);
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = async () => {
    try {
      // Firebaseにデータを保存
      await addDoc(collection(db, "inquiries"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      alert("お問い合わせを送信しました。ありがとうございました！");
      setIsConfirm(false);
      // 入力フォームをクリア
      setFormData({ name: "", email: "", emailConfirm: "", zip: "", address: "", message: "" });
    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div className="pt-40 pb-20 font-[family-name:var(--font-oswald)]">
      <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
          <span className="text-[12rem] md:text-[22rem] font-black italic leading-none uppercase tracking-tighter">MESSAGE</span>
        </div>
        <div className="relative z-10 border-l-8 border-orange-600 pl-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
            GET IN <span className="text-orange-600">TOUCH</span>
          </h1>
          <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">お問い合わせ</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-gray-100 shadow-2xl overflow-hidden">
          <div className="bg-black text-white py-8 px-10">
            <h2 className="text-2xl font-black italic tracking-tight uppercase">Inquiry Form</h2>
            <p className="text-xs mt-2 text-gray-400 font-bold tracking-widest uppercase">必要事項をご記入の上、送信してください。</p>
          </div>

          {!isConfirm ? (
            /* --- 入力フォーム画面 --- */
            <form onSubmit={handleConfirm} className="p-10 space-y-10">
            {/* 項目 / 経験 / 連絡方法 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Subject / 項目 <span className="text-orange-600">＊</span></label>
                <div className="flex flex-wrap gap-4 text-sm font-bold italic">
                  {["無料体験申込み", "入会希望", "その他"].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                      <input type="radio" name="subject" value={item} checked={formData.subject === item} onChange={handleChange} className="accent-orange-600" /> {item}
                    </label>
                  ))}
                </div>
                <div className="pt-2">
                  <Link 
                    href="/reservation" 
                    className="inline-block bg-orange-600 text-white px-4 py-2 text-[10px] font-black italic uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-orange-600/20"
                  >
                    体験予約はこちらから →
                  </Link>
                </div>
              </div>
              
              {/* 追加した項目：ご希望の連絡方法 */}
              <div className="space-y-4">
                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Contact Method / ご希望の連絡方法 <span className="text-orange-600">＊</span></label>
                <div className="flex gap-6 text-sm font-bold italic">
                  {["メール", "電話"].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                      <input type="radio" name="contactMethod" value={method} checked={formData.contactMethod === method} onChange={handleChange} className="accent-orange-600" /> {method}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Experience / 柔術の経験</label>
                <div className="flex gap-6 text-sm font-bold italic">
                  {["有り", "無し"].map((exp) => (
                    <label key={exp} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                      <input type="radio" name="experience" value={exp} checked={formData.experience === exp} onChange={handleChange} className="accent-orange-600" /> {exp}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Gender / 性別</label>
                <div className="flex gap-6 text-sm font-bold italic">
                  {["男性", "女性", "回答しない"].map((gender) => (
                    <label key={gender} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                      <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleChange} className="accent-orange-600" /> {gender}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* お名前・電話番号 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Name / お名前 <span className="text-orange-600">＊</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="山田 太郎" className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none font-sans" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Phone / 電話番号</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="09012345678" className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none font-sans" />
              </div>
            </div>

            {/* メールアドレス（確認機能付き） */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Email / メールアドレス <span className="text-orange-600">＊</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none font-sans" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Email Confirm / 確認用 <span className="text-orange-600">＊</span></label>
                <input 
                  type="email" 
                  name="emailConfirm" 
                  value={formData.emailConfirm} 
                  onChange={handleChange} 
                  placeholder="もう一度入力してください" 
                  className={`w-full border-2 p-4 outline-none font-sans transition-colors ${emailError ? 'border-red-500' : 'border-gray-100 focus:border-orange-600'}`} 
                  required 
                />
                {emailError && <p className="text-red-500 text-[10px] font-bold mt-1 italic">{emailError}</p>}
              </div>
            </div>

            {/* 住所（自動入力） */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Zip Code / 郵便番号</label>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">〒</span>
                    <input type="text" name="zip" value={formData.zip} onChange={handleZipChange} placeholder="1234567" maxLength={7} className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none font-sans" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Prefecture / 都道府県</label>
                  <select name="prefecture" value={formData.prefecture} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none bg-white font-sans appearance-none">
                    {["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"].map(pref => (
                      <option key={pref} value={pref}>{pref}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">City / 市区町村</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="大阪市中央区" className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none font-sans" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Address / 番地・建物名</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="備後町3-1-6 船場アルファビル 2F" className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none font-sans" />
              </div>
            </div>

            {/* 内容 */}
            <div className="space-y-2">
              <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Message / お問い合わせ内容</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="ご質問やご相談をご記入ください" className="w-full border-2 border-gray-100 p-4 h-48 focus:border-orange-600 outline-none font-sans resize-none"></textarea>
            </div>

            <div className="text-center pt-6">
              <button type="submit" className="bg-orange-600 text-white px-12 py-5 hover:bg-black transition-all duration-300 border-r-4 border-orange-400 shadow-xl font-black italic uppercase tracking-tighter text-xl">
                内容を確認して送信する →
              </button>
            </div>
            </form>
          ) : (
            /* --- 確認画面 --- */
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-1 gap-6 border-b border-gray-100 pb-8">
                {[
                  { label: "項目", value: formData.subject },
                  { label: "連絡方法", value: formData.contactMethod },
                  { label: "柔術経験", value: formData.experience },
                  { label: "性別", value: formData.gender },
                  { label: "お名前", value: formData.name },
                  { label: "電話番号", value: formData.phone || "未入力" },
                  { label: "メールアドレス", value: formData.email },
                  { label: "住所", value: `〒${formData.zip} ${formData.prefecture}${formData.city}${formData.address}` },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col md:flex-row md:items-center border-b border-gray-50 py-2">
                    <span className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 w-40">{item.label}</span>
                    <span className="font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
                <div className="flex flex-col py-2">
                  <span className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 mb-2">Message / お問い合わせ内容</span>
                  <p className="font-bold text-gray-900 whitespace-pre-wrap leading-relaxed">{formData.message || "未入力"}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-6 pt-6">
                {/* 戻るボタン */}
                <button 
                  onClick={handleBack}
                  className="bg-gray-200 text-gray-600 px-12 py-5 font-black italic uppercase tracking-tighter text-xl hover:bg-gray-300 transition-all"
                >
                  ← 修正する
                </button>
                
                {/* 最終送信ボタン */}
                <button 
                  onClick={handleFinalSubmit}
                  className="group relative inline-block bg-orange-600 text-white px-12 py-5 hover:bg-black transition-all duration-300 border-r-4 border-orange-400 shadow-xl"
                >
                  <div className="flex flex-col items-start leading-none relative">
                    <div className="absolute -left-4 top-0 w-[1px] h-full bg-white/40"></div>
                    <span className="text-[10px] font-black tracking-[0.4em] mb-1 opacity-80 uppercase">Final Submit</span>
                    <span className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-4">
                      この内容で送信する
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}