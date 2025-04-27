import { z } from "zod";

export const meResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});
