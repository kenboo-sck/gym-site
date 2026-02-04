import { Metadata } from 'next';
import MembershipContent from './MembershipContent';

export const metadata: Metadata = {
  title: '入会案内・料金プラン',
  description: '大阪本町の格闘技ジム料金案内。月額8,800円〜、入会金無料・2ヶ月無料のオープニングキャンペーン実施中。女性・学生・キッズ割引あり。',
};

export default function MembershipPage() {
  return <MembershipContent />;
}