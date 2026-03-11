import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(5).max(100),
    name: z.string().min(1).max(100),
    password: z.string().min(8).max(100),
});

const userLoginSchema = z.object({
    username: z.string().min(5).max(100),
    password: z.string().min(8).max(100),
});

export { userSchema, userLoginSchema };
