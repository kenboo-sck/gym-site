import { Metadata } from 'next';
import RentalContent from './RentalContent';

export const metadata: Metadata = {
  title: 'レンタルスペース',
  description: '大阪本町格闘技ジムのマットエリア・トレーニングエリアのレンタルスペース利用案内。1時間2,200円(税込)。パーソナルトレーニング・撮影・自主練習等に利用可能。',
};

export default function RentalPage() {
  return <RentalContent />;
}
