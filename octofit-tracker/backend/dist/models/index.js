"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: false },
    goal: { type: String, default: 'Stay active' },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true },
    sport: { type: String, default: 'Fitness' },
    members: [{ type: String }],
    captain: { type: String, required: true },
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    notes: { type: String, default: '' },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, required: true },
    equipment: [{ type: String }],
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
//# sourceMappingURL=index.js.map