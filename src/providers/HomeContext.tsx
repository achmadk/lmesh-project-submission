"use client";

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useState,
} from "react";

export interface HomeContextType {
  selectedIndex: number | null;
  setSelectedIndex: Dispatch<SetStateAction<number | null>>;
}

export const HomeContext = createContext<HomeContextType>(null!);

export const HomeContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <HomeContext value={{ selectedIndex, setSelectedIndex }}>
      {children}
    </HomeContext>
  );
};

export function useHomeContext() {
  return useContext(HomeContext);
}
