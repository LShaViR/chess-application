import { useDispatch } from "react-redux";
import { messageHandler } from "../utils/messageHandler";

const useMessageHandler = (socket: WebSocket) => {
  const dispatch = useDispatch();
  socket.onmessage = async (message) => {
    messageHandler(dispatch, message.data);
  };

  return messageHandler;
};

export default useMessageHandler;
