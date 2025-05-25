import { Request, Response } from "express";
import { UserSchemaType } from "../../zod/types";
import { userSchema } from "../../zod/schema";
import prisma from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config";

const signup = async (req: Request, res: Response) => {
  try {
    const body = userSchema.safeParse(req.body);
    console.log("signup");
    console.log(req.body);

    if (!body.success) {
      res.send("wrong input");
      return;
    }
    console.log("signup1");
    const { email, name, password }: UserSchemaType = body.data;
    console.log("signup2");
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      res.send("user already exist");
      return;
    }
    console.log("signup3");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("signup4");
    const response = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    console.log("signup5");

    const token = await jwt.sign(
      { id: response.id, name: response.name },
      jwtSecret,
    );
    res.cookie("userToken", token);
    res.send({ token: token });
  } catch (error) {
    res.send("something went wrong");
  }
};

export default signup;
