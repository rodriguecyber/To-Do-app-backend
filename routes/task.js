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
const Task_1 = __importDefault(require("../models/Task"));
const userMidleware_1 = __importDefault(require("../middeware/userMidleware"));
const taskValidation_1 = require("../validation/taskValidation");
const taskRoutes = express_1.default.Router();
taskRoutes.post('/upload', userMidleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = {
            userId: req.currentUser._id,
            task: req.body.task,
            date: req.body.date,
            time: req.body.time
        };
        const validResult = taskValidation_1.validationSchema.validate(newTask);
        if (validResult.error) {
            res.status(400).json({ error: validResult.error.details[0].message });
        }
        else {
            yield Task_1.default.create(newTask);
            res.json({ message: 'task added' });
        }
    }
    catch (error) {
        res.send('Error creating task:');
        res.status(500);
    }
}));
taskRoutes.get('/', userMidleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.default.find({ userId: req.currentUser._id });
        res.json(task);
        res.status(200);
    }
    catch (error) {
        res.json('failed to get tasks');
    }
}));
taskRoutes.delete('/delete/:id', userMidleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Task_1.default.findOne({ _id: req.params.id });
        yield Task_1.default.deleteOne({ _id: req.params.id });
        res.json('task deleted');
    }
    catch (error) {
        res.json('failed to delete task');
    }
}));
taskRoutes.patch('/update/:id', userMidleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Task_1.default.findOne({ _id: req.params.id });
        yield Task_1.default.updateOne({ _id: req.params.id }, {
            $set: {
                task: req.body.task,
                date: req.body.date,
                time: req.body.time
            }
        }, { upsert: true });
        res.send('task updated');
    }
    catch (error) {
        res.status(400).send('failed to update');
    }
}));
exports.default = taskRoutes;
