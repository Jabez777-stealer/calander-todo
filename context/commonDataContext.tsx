'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  user: string | null;
  setUser: (user: any) => void;
  activeEvent:any,
  setActiveEvent:(event:any)=>void
  setActivePopup:(event:any)=>void
  activePopup:any
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>('jbz');
  const [activeEvent,setActiveEvent] = useState<any>({})
  const [activePopup,setActivePopup] = useState<any>({})


  const exportObj ={
    user, setUser,
    activeEvent,setActiveEvent,
    activePopup,setActivePopup
}

  return (
    <AppContext.Provider value={{...exportObj}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
