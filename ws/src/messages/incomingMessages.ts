import z from "zod";
import { shortMoveSchema } from "../types";

export enum SupportedIncomingMessage {
  INIT_GAME = "init_game",
  MOVE = "move",
  JOIN_ROOM = "join_room",
  EXIT_GAME = "exit_game",
}

export const initGamePayloadSchema = z.object({
  playerId: z.string(),
});

export const joinRoomPayloadSchema = z.object({
  playerId: z.string(),
  gameId: z.string(),
});

export const exitGamePayloadSchema = z.object({
  playerId: z.string(),
  gameId: z.string(),
});

export const incomingMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(SupportedIncomingMessage.INIT_GAME),
    payload: initGamePayloadSchema,
  }),
  z.object({
    type: z.literal(SupportedIncomingMessage.MOVE),
    payload: shortMoveSchema,
  }),
  z.object({
    type: z.literal(SupportedIncomingMessage.JOIN_ROOM),
    payload: joinRoomPayloadSchema,
  }),
  z.object({
    type: z.literal(SupportedIncomingMessage.EXIT_GAME),
    payload: exitGamePayloadSchema,
  }),
]);

export type InitGamePayloadType = z.infer<typeof initGamePayloadSchema>;
export type MoveInPayloadType = z.infer<typeof shortMoveSchema>;
export type JoinRoomPayloadType = z.infer<typeof joinRoomPayloadSchema>;
export type ExitGamePayloadType = z.infer<typeof exitGamePayloadSchema>;

export type IncomingMessage = z.infer<typeof incomingMessageSchema>;
