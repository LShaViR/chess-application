"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../../zod/schema");
const db_1 = __importDefault(require("../../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = schema_1.userSchema.safeParse(req.body);
        console.log("signup");
        console.log(req.body);
        if (!body.success) {
            res.send("wrong input");
            return;
        }
        console.log("signup1");
        const { email, name, password } = body.data;
        console.log("signup2");
        const user = yield db_1.default.user.findFirst({ where: { email } });
        if (user) {
            res.send("user already exist");
            return;
        }
        console.log("signup3");
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log("signup4");
        const response = yield db_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });
        console.log("signup5");
        const token = yield jsonwebtoken_1.default.sign({ id: response.id, name: response.name }, config_1.jwtSecret);
        res.cookie("userToken", token);
        res.send({ token: token });
    }
    catch (error) {
        res.send("something went wrong");
    }
});
exports.default = signup;
