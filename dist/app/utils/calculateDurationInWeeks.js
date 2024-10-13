"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateDurationInWeeks = (start, end) => {
    const newStartDate = new Date(start);
    const newEndDate = new Date(end);
    const durationMilliSeconds = newEndDate.getTime() - newStartDate.getTime();
    const days = durationMilliSeconds / (1000 * 60 * 60 * 24);
    const weeks = Math.ceil(days / 7);
    return weeks;
};
exports.default = calculateDurationInWeeks;
