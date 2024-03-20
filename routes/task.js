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
const taskRoutes = express_1.default.Router();
taskRoutes.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = yield Task_1.default.create({
            task: req.body.task,
            date: req.body.date,
            time: req.body.time
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500);
    }
}));
taskRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.default.find();
        res.json(task);
        res.status(200);
    }
    catch (error) {
        res.send('failed to get tasks');
    }
}));
taskRoutes.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Task_1.default.findOne({ _id: req.params.id });
        yield Task_1.default.deleteOne({ _id: req.params.id });
        res.json('task deleted');
    }
    catch (error) {
        res.send('failed to delete task');
    }
}));
taskRoutes.patch('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
