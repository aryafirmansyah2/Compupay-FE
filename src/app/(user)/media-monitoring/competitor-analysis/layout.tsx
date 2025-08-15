import { CompetitorAnalysisProvider } from '@/context/competitorAnalysisContext';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CompetitorAnalysisProvider>{children}</CompetitorAnalysisProvider>;
}
