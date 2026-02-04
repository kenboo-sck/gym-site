import { Metadata } from 'next';
import ClassContent from './ClassContent';

export const metadata: Metadata = {
  title: 'クラス紹介',
  description: '大阪本町でブラジリアン柔術・キックボクシング・MMA・キッズクラスを開講。初心者から競技者まで、レベル別クラスで確実に上達。まずは無料体験へ。',
};

export default function ClassPage() {
  return <ClassContent />;
}