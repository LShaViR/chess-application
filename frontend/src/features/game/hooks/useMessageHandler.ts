import { useDispatch } from "react-redux";
import { messageHandler } from "../utils/messageHandler";

const useMessageHandler = (socket: WebSocket | null) => {
  const dispatch = useDispatch();
  
  if (socket) {
    socket.onmessage = async (message) => {
      messageHandler(dispatch, message.data);
    };
  }

  return messageHandler;
};

export default useMessageHandler;
