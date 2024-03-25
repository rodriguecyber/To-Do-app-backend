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
    date: joi_1.default.string().required().regex(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])$/),
    time: joi_1.default.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    userId: joi_1.default.required()
});
exports.validationSchema = exports.taskValiadtion.messages({
    'string.base': '{{#label}} must be a string',
    'string.min': '{{#label}} must be at least {{#limit}} characters long',
    'string.max': '{{#label}} cannot exceed {{#limit}} characters',
    'string.regex': 'Please enter a valid {{#label}} format',
});
