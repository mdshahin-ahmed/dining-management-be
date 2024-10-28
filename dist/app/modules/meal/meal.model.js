"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const mongoose_1 = require("mongoose");
const mealSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Meal = (0, mongoose_1.model)('Meal', mealSchema);
