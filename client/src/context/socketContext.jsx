import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import { useApi } from "./ApiContext";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const { host } = useApi();

  useEffect(() => {
    socket.current = io(host);

    socket.current.on("connect", () => {
      socket.current.emit("request-current-team");
      setConnected(true);
    });

    socket.current.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = undefined;
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
}
