"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const task_1 = __importDefault(require("./routes/task"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/todotask');
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
app.use('/api/v1', user_1.default);
app.use('/api/v1', task_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
exports.default = app;
