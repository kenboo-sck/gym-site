import { Metadata } from 'next';
import MembershipContent from './MembershipContent';

export const metadata: Metadata = {
  title: '入会案内・料金プラン',
  description: '大阪本町の格闘技ジム料金案内。月額8,800円〜、入会金無料・月会費1ヶ月無料の新生活応援キャンペーン実施中（6月末まで）。女性・学生・キッズ割引あり。',
};

export default function MembershipPage() {
  return <MembershipContent />;
}
