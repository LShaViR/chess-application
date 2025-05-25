import { Request, Response } from "express";
import { UserLoginSchemaType } from "../../zod/types";
import { userLoginSchema } from "../../zod/schema";
import prisma from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config";

const userLogin = async (req: Request, res: Response) => {
  try {
    const body = userLoginSchema.safeParse(req.body);
    if (!body.success) {
      res.send("wrong input");
      return;
    }
    const { email, password }: UserLoginSchemaType = body.data;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      res.status(404).send("user not exist");
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.send("wrong password");
      return;
    }
    const token = jwt.sign({ id: user.id, name: user.name }, jwtSecret);

    res.cookie("userToken", token);
    res.send({ token: token });
  } catch (error) {
    res.send("something went wrong");
  }
};

export default userLogin;
