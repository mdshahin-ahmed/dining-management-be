"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const mongoose_1 = require("mongoose");
const statementSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        enum: ['nagad', 'bkash'],
        required: true,
    },
    transactionNumber: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    prevBalance: {
        type: Number,
        required: true,
    },
    newBalance: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending',
    },
}, {
    timestamps: true,
});
exports.Statement = (0, mongoose_1.model)('Statement', statementSchema);
