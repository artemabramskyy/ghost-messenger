import React, {
  createContext,
  useContext,
  ReactNode,
  useState, useEffect,
} from 'react';
import {initWS} from "../Api";
import StoredChat from "root/src/interfaces/StoredChat";
import User from "root/src/interfaces/User";
import StoredMessage from "root/src/interfaces/StoredMessage";

interface TypeGuardContext {
  isChatConsistent: (arg: any) => boolean;
  isUserConsistent: (arg: any) => boolean;
}

interface WSContext {
  webSocket: WebSocket | null;
  URL: string
}

const WSContext = createContext<WSContext | undefined>(undefined);
const TypeGuardContext = createContext<TypeGuardContext | undefined>(undefined);

export const WSProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  // not sure whether this is the best practice
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    setWebSocket(initWS());
  }, []);

  return (
    <WSContext.Provider
      value={{webSocket, URL: "http://localhost:4000/api/v1"}}>
      {children}
    </WSContext.Provider>
  );
};

export const TypeGuardProvider: React.FC<{
  children: ReactNode
}> = ({children}) => {
  const isStoredMessageConsistent = (obj: any): obj is StoredMessage => {
    return typeof obj === "object" && obj !== null  && obj !== undefined
      && typeof obj.receiverId === 'string' && typeof obj.text === 'string' && typeof obj.senderId === 'string';
  }
  const isUserConsistent = (obj: any): obj is User => {
    return typeof obj === 'object' && obj !== null && obj !== undefined && typeof obj.username === 'string' && typeof obj.id === 'string';
  };

  const isChatConsistent = (obj: any): obj is StoredChat => {
    return typeof obj === 'object' && obj !== null && obj !== undefined
      && Array.isArray(obj.storedMessages) && isUserConsistent(obj.sender)
      && isUserConsistent(obj.receiver) && obj.storedMessages.every((message: any) => isStoredMessageConsistent(message));
  }
  return (
    <TypeGuardContext.Provider value={{
      isChatConsistent: isChatConsistent,
      isUserConsistent: isUserConsistent
    }}>
      {children}
    </TypeGuardContext.Provider>
  );
}

export const useWSContext = (): WSContext => {
  const context = useContext(WSContext);
  if (context === undefined) {
    throw new Error('useWsContext must be used within a WSProvider');
  }
  return context as WSContext;
};

export const useTypeGuardContext = (): TypeGuardContext => {
  const context = useContext(TypeGuardContext);
  if (context === undefined) {
    throw new Error('useConsistencyContext must be used within a ConsistencyProvider');
  }
  return context as TypeGuardContext;
}
