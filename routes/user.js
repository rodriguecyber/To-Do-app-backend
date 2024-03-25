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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const userMidleware_1 = __importDefault(require("../middeware/userMidleware"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRoutes = express_1.default.Router();
userRoutes.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.find({ email: req.body.email }).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result.length === 0) {
                const newUser = yield User_1.default.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                res.json(newUser);
            }
            else {
                res.json({ message: 'user already exists' });
            }
        }));
    }
    catch (error) {
        console.error(error);
        res.status(400).send('Failed to register');
    }
}));
userRoutes.get('/user', userMidleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.currentUser;
        if (user.userType) {
            const users = yield User_1.default.find();
            res.json(users);
        }
        else {
            res.json({ message: 'not admin' });
        }
    }
    catch (err) {
        res.sendStatus(400);
    }
}));
userRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.send('User not found');
        }
        else {
            if (user.password === req.body.password) {
                const expire = eval(process.env.EXPIRE);
                const token = jsonwebtoken_1.default.sign({ userId: user._id, exp: expire }, process.env.JWT_SECRET);
                req.currentUser = user;
                res.status(200).json({ message: 'user loged in', token: token, expirein: (Math.floor(expire - Math.floor(Date.now()) / 1000)) + "s" });
                req.exptime = expire;
            }
            else {
                res.send('Wrong password');
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}));
userRoutes.post('/reset', (req, res) => {
    const email = req.body.email;
    User_1.default.find({ email: email })
        .then((result) => {
        if (result.length === 0) {
            res.json({ message: 'email not found' });
        }
        else {
            const resetExpire = eval(process.env.RESETEXPIRE);
            jsonwebtoken_1.default.sign({ email: email, exp: resetExpire }, process.env.JWTRESET);
            req.currentRequest = email;
            res.json({ message: 'reset token sent ', email: email });
        }
    });
});
exports.default = userRoutes;
