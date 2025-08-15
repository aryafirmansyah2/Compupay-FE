import { ContentPerformanceProvider } from '@/context/contentPerformanceContext';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ContentPerformanceProvider>{children}</ContentPerformanceProvider>;
}
