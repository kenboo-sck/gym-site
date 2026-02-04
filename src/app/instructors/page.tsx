import { Metadata } from 'next';
import InstructorsContent from './InstructorsContent';

export const metadata: Metadata = {
  title: 'インストラクター',
  description: 'JBJJF全日本選手権優勝・MMA戦績7戦5勝の井上啓太が直接指導。大阪本町で世界レベルのブラジリアン柔術・MMA技術を初心者にもわかりやすくレクチャー。',
};

export default function InstructorsPage() {
  return <InstructorsContent />;
}