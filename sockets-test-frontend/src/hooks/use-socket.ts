import { useState, useEffect } from "react";
import io from "socket.io-client";

export default (url: string) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect((): any => {
    setSocket(io(url));

    return () => socket?.disconnect();
  }, []);

  return socket;
};
