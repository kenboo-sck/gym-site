import { Metadata } from 'next';
import NewsListContent from './NewsListContent';

export const metadata: Metadata = {
  title: 'ニュース',
  description: '大阪本町ALMA FIGHT GYMの最新ニュース。イベント情報・キャンペーン・試合結果・新クラス開講など、ジムの最新情報をお届けします。',
};

export default function NewsPage() {
  return <NewsListContent />;
}