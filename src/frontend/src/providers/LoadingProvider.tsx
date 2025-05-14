import { createContext, ReactNode, useContext, useState } from "react";

export type LoadingProviderContextState = {
  isLoading: boolean;
  loaderCallWrapper: (callback: () => Promise<any>) => Promise<any>;
};

export const LoadingProviderContext =
  createContext<LoadingProviderContextState>({} as LoadingProviderContextState);

export const useLoading = (): LoadingProviderContextState => {
  const context = useContext(LoadingProviderContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loaderCallWrapper = async (callback: () => Promise<any>) => {
    setIsLoading(true);
    try {
      return await callback();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingProviderContext.Provider value={{ isLoading, loaderCallWrapper }}>
      {children}
    </LoadingProviderContext.Provider>
  );
}
