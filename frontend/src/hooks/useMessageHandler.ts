import { useDispatch, useSelector } from "react-redux";

import useMakeMove from "./useMakeMove";
import { Chess } from "chess.js";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { initMessageHandler } from "../utils/messageHandler";
const useMessageHandler = () => {
  const makeMove = useMakeMove();
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game.value);
  const [messageHandler, setMessageHandler] = useState(() =>
    initMessageHandler(new Chess(), dispatch, makeMove)
  );

  useEffect(() => {
    if (game)
      setMessageHandler(() =>
        initMessageHandler(game?.chess, dispatch, makeMove)
      );
  }, [game]);
  //   const playGame = useSelector((state: RootState) => state.playGame.value);

  return messageHandler;
};

export default useMessageHandler;
