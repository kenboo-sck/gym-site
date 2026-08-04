import { Metadata } from 'next';
import FaqContent from './FaqContent';

export const metadata: Metadata = {
  title: 'よくある質問（FAQ）',
  description: 'ALMA FIGHT GYM OSAKA HONMACHIのよくある質問。未経験・年齢制限・手ぶら体験・途中参加・見学・設備・駐車場などに関する疑問にお答えします。',
};

export default function FaqPage() {
  return <FaqContent />;
}
