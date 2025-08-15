// contexts/SelfGrowthContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type SelfGrowthState = {
  toggleProxy: any;
  setToggleProxy: (data: any) => void;
};

const SelfGrowthContext = createContext<SelfGrowthState | undefined>(undefined);

export function SelfGrowthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggleProxy, setToggleProxy] = useState('opposition');

  return (
    <SelfGrowthContext.Provider
      value={{
        toggleProxy,
        setToggleProxy,
      }}
    >
      {children}
    </SelfGrowthContext.Provider>
  );
}

export function useSelfGrowth() {
  const context = useContext(SelfGrowthContext);
  if (!context)
    throw new Error('useSelfGrowth must be used within SelfGrowthProvider');
  return context;
}
