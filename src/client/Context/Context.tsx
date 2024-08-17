import React, {
  createContext,
  useContext,
  ReactNode,
  useState, useEffect,
} from 'react';
import {initWS} from "root/src/client/api";

interface MyContextType {
  value: string;
  setValue: (newValue: string) => void;
}

interface WSContext {
  webSocket: WebSocket | null;
}

const WSContext = createContext<WSContext | undefined>(undefined);

export const WSProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  // not sure whether this is the best practice
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    setWebSocket(initWS());
  }, []);

  return (
    <WSContext.Provider value={{webSocket}}>
      {children}
    </WSContext.Provider>
  );
};

export const useWSContext = (): WSContext => {
  const context = useContext(WSContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context as WSContext;
};
