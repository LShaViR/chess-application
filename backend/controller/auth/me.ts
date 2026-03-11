import { Request, Response } from "express";

const userMe = (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    if (!user) {
      throw new Error("user not found");
    }
    return res.status(200).json({ user });
  } catch (error) {}
};

export default userMe;
