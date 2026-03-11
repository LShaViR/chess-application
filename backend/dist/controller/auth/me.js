"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userMe = (req, res) => {
    try {
        //@ts-ignore
        const user = req.user;
        if (!user) {
            throw new Error("user not found");
        }
        return res.status(200).json({ user });
    }
    catch (error) { }
};
exports.default = userMe;
