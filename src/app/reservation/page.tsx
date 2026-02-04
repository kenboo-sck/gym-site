import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '体験予約',
  description: '大阪本町ALMA FIGHT GYMの無料体験レッスン予約。手ぶらでOK、初心者大歓迎。ブラジリアン柔術・キックボクシングを気軽に体験してみませんか？',
};

export default function ReservationPage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold">体験予約</h1>
      <p className="mt-4">準備中です</p>
    </div>
  );
}