import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
    sendMessage: (msg: string) => string | unknown;
    // receiveMessage?: (msg: string) => string | unknown
}

const SocketContext = React.createContext<ISocketContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  const state = useContext(SocketContext);

  if (!state) throw new Error("state is undefined in useSocket");

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket, setSocket] = useState<Socket>();

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg: string) => {
          console.log("Send message: ", msg);
          if (socket) {
              socket.emit("message", {message: msg})
          }
    },
    [socket]
    );

    const receiveMessage = useCallback((msg: string) => {
        console.log("Message received from server: ", msg)
    }, [])
    
    // socket?.on("message", (msg: string) => {
    //     console.log("Message received from server: ", msg)
    // })

  useEffect(() => {
    const _socket = io("http://localhost:3000");
    _socket.on("message", receiveMessage)
    setSocket(_socket)
    return () => {
        _socket.disconnect();
        _socket.off("message", receiveMessage)
        setSocket(undefined)
    };
  }, [receiveMessage]);

  return (
    <SocketContext.Provider value={{sendMessage}}>{children}</SocketContext.Provider>
  );
};
