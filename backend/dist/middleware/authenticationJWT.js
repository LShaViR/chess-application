"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationUserJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authenticationUserJWT = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.send("token not found");
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtSecret);
        if (decoded) {
            // @ts-ignore: Unreachable code error
            req.user = decoded.id;
            next();
        }
        else {
            res.send("wrong password");
        }
    }
    catch (e) {
        res.send("something went wrong");
    }
};
exports.authenticationUserJWT = authenticationUserJWT;
