import { WS_URL } from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("tokenChess");
    
    if (!token) {
      console.log("No token found, redirecting to auth");
      navigate("/auth");
      return;
    }

    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      console.log("Connection established");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Connection closed");
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [navigate]);

  return socket;
};


export default useSocket;
