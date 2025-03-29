"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    email: zod_1.z.string().min(5).max(100).email(),
    name: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(8).max(100)
});
exports.userSchema = userSchema;
const userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().min(5).max(100).email(),
    password: zod_1.z.string().min(8).max(100)
});
exports.userLoginSchema = userLoginSchema;
