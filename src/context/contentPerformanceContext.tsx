// contexts/ContentPerformanceContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type ContentPerformanceState = {
  toggleProxy: any;
  setToggleProxy: (data: any) => void;
};

const ContentPerformanceContext = createContext<
  ContentPerformanceState | undefined
>(undefined);

export function ContentPerformanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggleProxy, setToggleProxy] = useState('opposition');

  return (
    <ContentPerformanceContext.Provider
      value={{
        toggleProxy,
        setToggleProxy,
      }}
    >
      {children}
    </ContentPerformanceContext.Provider>
  );
}

export function useContentPerformance() {
  const context = useContext(ContentPerformanceContext);
  if (!context)
    throw new Error(
      'useContentPerformance must be used within ContentPerformanceProvider'
    );
  return context;
}
