// contexts/OverviewContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type OverviewState = {
  toggleProxy: any;
  setToggleProxy: (data: any) => void;
};

const OverviewContext = createContext<OverviewState | undefined>(undefined);

export function OverviewProvider({ children }: { children: React.ReactNode }) {
  const [toggleProxy, setToggleProxy] = useState('opposition');

  return (
    <OverviewContext.Provider
      value={{
        toggleProxy,
        setToggleProxy,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
}

export function useOverview() {
  const context = useContext(OverviewContext);
  if (!context)
    throw new Error('useOverview must be used within OverviewProvider');
  return context;
}
