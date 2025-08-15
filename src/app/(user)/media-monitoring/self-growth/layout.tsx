import { SelfGrowthProvider } from '@/context/selfGrowthContext';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SelfGrowthProvider>{children}</SelfGrowthProvider>;
}
