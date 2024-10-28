"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    hostel: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
