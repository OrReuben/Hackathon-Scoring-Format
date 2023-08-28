import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { host } from '../apiRoutes';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const socket = useRef();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.current = io(host);

    socket.current.on('connect', () => {
      socket.current.emit('request-current-team');
      setConnected(true);
    });

    socket.current.on('disconnect', () => {
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

