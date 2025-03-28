import { z } from "zod";
import { userSchema, userLoginSchema } from "./schema";

type UserSchemaType=z.infer<typeof userSchema>
type UserLoginSchemaType=z.infer<typeof userLoginSchema>


export {UserSchemaType,UserLoginSchemaType}