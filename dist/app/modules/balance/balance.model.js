"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
const mongoose_1 = require("mongoose");
const balanceSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        default: 'cash',
        required: true,
    },
    amount: {
        type: Number,
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
        default: 'approved',
    },
}, {
    timestamps: true,
});
exports.Balance = (0, mongoose_1.model)('Balance', balanceSchema);
