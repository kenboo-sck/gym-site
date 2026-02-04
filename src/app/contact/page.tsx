import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: '大阪本町の格闘技ジムALMA FIGHT GYMへのお問い合わせフォーム。無料体験の予約・入会相談・見学のお申し込みはこちら。24時間受付中。',
};

export default function ContactPage() {
  return <ContactContent />;
}