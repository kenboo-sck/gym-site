"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // authをエクスポートしている必要があります
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard"); // ログイン後ダッシュボードへ
    } catch (error) {
      alert("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
    }
  };

  return (
    <div className="pt-40 flex flex-col items-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-black italic mb-6 text-center">ADMIN LOGIN</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-black text-white p-3 rounded-full font-bold hover:bg-orange-600 transition">
          LOGIN
        </button>
      </form>
    </div>
  );
}