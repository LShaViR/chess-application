import { WS_URL } from "../config";
import { useEffect, useState } from "react";

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const token = localStorage.getItem("tokenChess");

  useEffect(() => {
    if (!token) return;
    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      console.log("Connection established");
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [token]);

  return socket;
};

// import useMessageHandler from "./useMessageHandler";
// import { useNavigate } from "react-router-dom";

// const useSocket = () => {
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const messageHandler = useMessageHandler();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("tokenChess");
//     if (!token) {
//       navigate("/auth");
//     }
//     const newSocket = new WebSocket(`ws://localhost:8080/?token=${token}`);
//     newSocket.onopen = () => {
//       console.log("Connection established");
//     };
//     newSocket.onmessage = async (message) => {
//       console.log("message");
//       // console.log(message);

//       await messageHandler(message.data);
//     };
//     setSocket(newSocket);
//     return () => newSocket.close();
//   }, []);
//   return socket;
// };

export default useSocket;
