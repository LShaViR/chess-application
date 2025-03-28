import { useEffect, useState } from "react";
import useMessageHandler from "./useMessageHandler";

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messageHandler = useMessageHandler();

  useEffect(() => {
    const token = "luckyrathore" + Math.random() * 100;
    const newSocket = new WebSocket(`ws://localhost:8080/?token=${token}`);
    newSocket.onopen = () => {
      console.log("Connection established");
    };
    newSocket.onmessage = async (message) => {
      console.log("message");

      await messageHandler(message.data);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
  return socket;
};

export default useSocket;
