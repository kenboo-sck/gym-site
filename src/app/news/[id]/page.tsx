"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      if (!params.id) return;
      
      try {
        const docRef = doc(db, "news", params.id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setNews(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [params.id]);

  if (loading) {
    return <div className="pt-40 text-center font-black italic">LOADING...</div>;
  }

  if (!news) {
    return <div className="pt-40 text-center">記事が見つかりません</div>;
  }

  return (
    <>
      {/* 記事コンテンツ用のスタイル */}
     <style jsx global>{`
        .article-content p {
          margin: 1rem 0;
          line-height: 1.8;
          min-height: 1em;  
          text-align: justify;
        }
        .article-content p:empty {  
          min-height: 1.8em;
        }
        .article-content br {  
          display: block;
          margin: 0.5em 0;
          content: "";
        }
        .article-content h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 2rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #ea580c;
        }
        @media (min-width: 768px) {
          .article-content h2 {
            font-size: 1.75rem;
          }
        }
        .article-content h3 {
          font-size: 1.125rem;
          font-weight: bold;
          margin: 1.5rem 0 0.75rem;
        }
        @media (min-width: 768px) {
          .article-content h3 {
            font-size: 1.5rem;
          }
        }
        .article-content ul {
          margin: 1rem 0;
          padding-left: 2rem;
          list-style-type: disc;
          list-style-position: outside;
        }
        .article-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
          list-style-type: decimal;
          list-style-position: outside;
        }
        .article-content li {
          margin: 0.5rem 0;
          line-height: 1.8;
          padding-left: 0.5rem;
        }
        .article-content blockquote {
          border-left: 4px solid #ea580c;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #4b5563;
        }
        .article-content img {
          max-width: 100%;
          height: auto;
          margin: 2rem 0;
        }
        .article-content strong {
          font-weight: bold;
        }
        .article-content em {
          font-style: italic;
        }
        .article-content a {
          color: #ea580c;
          text-decoration: underline;
        }
      `}</style>

      <div className="pt-40 pb-20 px-4 max-w-[1000px] mx-auto font-[family-name:var(--font-oswald)]">
        <article>
          {news.image && (
            <div className="mb-8">
              <Image 
                src={news.image} 
                alt={news.title} 
                width={1200} 
                height={630} 
                className="w-full object-cover" 
                unoptimized
              />
            </div>
          )}
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs text-white bg-orange-600 font-bold uppercase">
              {news.category}
            </span>
            <span className="text-sm text-gray-400 ml-4">{news.date}</span>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-black mb-8 italic uppercase tracking-tight">{news.title}</h1>
          
          <div 
            className="article-content text-base"
            dangerouslySetInnerHTML={{ __html: news.content }} 
          />
        </article>
      </div>
    </>
  );
}