import z from "zod";
import { gameStatusSchema, moveSchema, playerGameSchema } from "../types";

export enum SupportedOutgoingMessage {
  GAME_ADDED = "game_added",
  GAME_STARTED = "game_started",
  MOVE = "move",
  OPPONENT_DISCONNECTED = "opponent_disconnected",
  OPPONENT_RECONNECTED = "opponent_reconnected",
  GAME_NOT_FOUND = "game_not_found",
  GAME_JOINED_AGAIN = "game_joined_again",
  GAME_OVER = "game_over",
}

export const gameAddedPayloadSchema = z.object({
  gameId: z.string(),
});

export const gameStartedPayloadSchema = z.object({
  player1: playerGameSchema,
  player2: playerGameSchema,
  timeControl: z.enum(["classical", "rapid", "blitz"]),
  gameTime: z.number(),
  gameId: z.string(),
});

export const gameJoinAgainPayloadSchema = z.object({
  player1: playerGameSchema,
  player2: playerGameSchema,
  timeControl: z.enum(["classical", "rapic", "blitz"]),
  player1TimeLeft: z.number(),
  player2TimeLeft: z.number(),
  gameId: z.string(),
  history: z.array(moveSchema),
  gameTurn: z.enum(["w", "b"]),
  gameStatus: gameStatusSchema,
});

export const gameOverPayloadSchema = z.object({
  result: z.enum(["black_wins", "white_wins", "draw"]),
});

export type GameAddedPayloadType = z.infer<typeof gameAddedPayloadSchema>;
export type GameStartedPayloadType = z.infer<typeof gameStartedPayloadSchema>;
export type MoveOutPayloadType = z.infer<typeof moveSchema>;
export type GameJoinAgainPayloadType = z.infer<
  typeof gameJoinAgainPayloadSchema
>;
export type GameOverPayloadType = z.infer<typeof gameOverPayloadSchema>;

export type OutgoingMessages =
  | {
      type: SupportedOutgoingMessage.GAME_ADDED;
      payload: GameAddedPayloadType;
    }
  | {
      type: SupportedOutgoingMessage.GAME_STARTED;
      payload: GameStartedPayloadType;
    }
  | {
      type: SupportedOutgoingMessage.MOVE;
      payload: MoveOutPayloadType;
    }
  | {
      type: SupportedOutgoingMessage.OPPONENT_DISCONNECTED;
    }
  | {
      type: SupportedOutgoingMessage.OPPONENT_RECONNECTED;
    }
  | {
      type: SupportedOutgoingMessage.GAME_NOT_FOUND;
    }
  | {
      type: SupportedOutgoingMessage.GAME_JOINED_AGAIN;
      payload: GameJoinAgainPayloadType;
    }
  | {
      type: SupportedOutgoingMessage.GAME_OVER;
      payload: GameOverPayloadType;
    };
