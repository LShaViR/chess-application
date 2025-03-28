import { z } from "zod";

const messageSchema = z.object({
  type: z.string(),
  payload: z.any().nullable(),
});

const initGameInSchema = z.object({
  type: z.string(),
  payload: z.object({}),
});

const moveInSchema = z.object({
  type: z.string(),
  payload: z.object({}),
});

const endGameInSchema = z.object({
  type: z.string(),
  payload: z.object({}),
});

const initGameOutSchema = z.object({
  type: z.string(),
  payload: z.object({}),
});

const moveOutSchema = z.object({
  type: z.string(),
  payload: z.object({}),
});

const gameOverSchema = z.object({
  type: z.string(),
  payload: z.object({}),
});

export { messageSchema };
