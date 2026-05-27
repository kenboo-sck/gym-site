"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const routeMap: { [key: string]: string } = {
  beginners: "初めての方へ",
  class: "クラス紹介",
  membership: "入会案内",
  schedule: "スケジュール",
  instructors: "インストラクター",
  access: "アクセス",
  contact: "問合せ",
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/" || !pathname) return null;

  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="fixed top-20 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 font-[family-name:var(--font-oswald)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 flex-nowrap overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-orange-600 transition-colors">HOME</Link>

        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const href = `/${paths.slice(0, index + 1).join("/")}`;

          const label = routeMap[path] || path;

          return (
            <div key={href} className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              {isLast ? (
                <span className="text-gray-900 truncate max-w-[200px] md:max-w-none italic">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:text-orange-600 transition-colors">
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
