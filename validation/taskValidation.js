"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = exports.taskValiadtion = void 0;
const joi_1 = __importDefault(require("joi"));
// type objId= string
exports.taskValiadtion = joi_1.default.object({
    task: joi_1.default.string()
        .alphanum()
        .min(5)
        .max(10)
        .required(),
    date: joi_1.default.string()
        .min(8)
        .max(8)
        .default('today'),
    time: joi_1.default.string()
        .min(3)
        .max(6)
        .default('12 am'),
    userId: joi_1.default.required()
});
exports.validationSchema = exports.taskValiadtion.messages({
    'string.base': '{{#label}} must be a string',
    'string.min': '{{#label}} must be at least {{#limit}} characters long',
    'string.max': '{{#label}} cannot exceed {{#limit}} characters',
    'string.email': 'Please enter a valid email address',
});
