import { OverviewProvider } from '@/context/overviewContext';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OverviewProvider>{children}</OverviewProvider>;
}
