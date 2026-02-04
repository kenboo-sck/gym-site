import { Metadata } from 'next';
import BeginnersContent from './BeginnersContent';

export const metadata: Metadata = {
  title: '初めての方へ',
  description: '格闘技未経験・運動不足でも安心。大阪本町のALMA FIGHT GYMでは会員の8割が初心者からスタート。プロが丁寧に指導する無料体験で、あなたも格闘技デビュー。',
};

export default function BeginnersPage() {
  return <BeginnersContent />;
}