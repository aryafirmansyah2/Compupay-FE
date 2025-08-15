// contexts/CompetitorAnalysisContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type CompetitorAnalysisState = {
  toggleProxy: any;
  setToggleProxy: (data: any) => void;
};

const CompetitorAnalysisContext = createContext<
  CompetitorAnalysisState | undefined
>(undefined);

export function CompetitorAnalysisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggleProxy, setToggleProxy] = useState('opposition');

  return (
    <CompetitorAnalysisContext.Provider
      value={{
        toggleProxy,
        setToggleProxy,
      }}
    >
      {children}
    </CompetitorAnalysisContext.Provider>
  );
}

export function useCompetitorAnalysis() {
  const context = useContext(CompetitorAnalysisContext);
  if (!context)
    throw new Error(
      'useCompetitorAnalysis must be used within CompetitorAnalysisProvider'
    );
  return context;
}
