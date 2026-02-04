import { Metadata } from 'next';
import ScheduleContent from './ScheduleContent';

export const metadata: Metadata = {
  title: 'スケジュール',
  description: '大阪本町ALMA FIGHT GYMの週間スケジュール。平日夜・土曜日も開講、仕事帰りに通いやすい時間割。柔術・キック・MMA各クラスの開講時間はこちら。',
};

export default function SchedulePage() {
  return <ScheduleContent />;
}