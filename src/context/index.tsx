"use client";

import { createContext, useContext, useState } from "react";

export const AppContext = createContext<any>(undefined);

type DiveIdType = string | undefined;

type AppContextType = {
  diveId: DiveIdType;
  setDiveId: (id: DiveIdType) => void;
};

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [diveId, setDiveId] = useState<DiveIdType>(undefined);
  return (
    <AppContext.Provider value={{ diveId, setDiveId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
