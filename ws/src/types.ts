import { z } from "zod";

export const gameStatusSchema = z.enum([
  "running",
  "white_wins",
  "black_wins",
  "draw",
  "unfinished",
]);

export const shortMoveSchema = z.object({
  from: z.string().regex(/^[a-h][1-8]$/),
  to: z.string().regex(/^[a-h][1-8]$/),
  promotion: z.enum(["q", "r", "b", "n"]),
});

export const moveSchema = z.object({
  from: z.string().regex(/^[a-h][1-8]$/),
  to: z.string().regex(/^[a-h][1-8]$/),
  promotion: z.enum(["q", "r", "b", "n"]),
  san: z.string(),
  timeSpent: z.number(),
});

export const playerGameSchema = z.object({
  username: z.string(),
  rating: z.string(),
  avatarUrl: z.string(),
});

export enum GameStatus {
  running = "running",
  white = "white_wins",
  black = "black_wins", 
  draw = "draw",
  unfinished = "unfinished",
}

export type ShortMoveType = z.infer<typeof shortMoveSchema>;
export type MoveType = z.infer<typeof moveSchema>;
export type GameStatusType = z.infer<typeof gameStatusSchema>;
