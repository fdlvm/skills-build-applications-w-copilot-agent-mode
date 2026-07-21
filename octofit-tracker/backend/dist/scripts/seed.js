"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await models_1.User.deleteMany({});
        await models_1.Team.deleteMany({});
        await models_1.Activity.deleteMany({});
        await models_1.LeaderboardEntry.deleteMany({});
        await models_1.Workout.deleteMany({});
        const users = await models_1.User.insertMany([
            { name: 'Maya Chen', email: 'maya.chen@example.com', age: 29, goal: 'Run a half marathon' },
            { name: 'Liam Ortiz', email: 'liam.ortiz@example.com', age: 34, goal: 'Build strength' },
            { name: 'Nia Patel', email: 'nia.patel@example.com', age: 27, goal: 'Improve mobility' },
        ]);
        await models_1.Team.insertMany([
            {
                name: 'Peak Performers',
                sport: 'CrossFit',
                members: users.slice(0, 2).map((user) => user._id.toString()),
                captain: users[0]._id.toString(),
            },
            {
                name: 'River Runners',
                sport: 'Running',
                members: [users[2]._id.toString()],
                captain: users[2]._id.toString(),
            },
        ]);
        await models_1.Activity.insertMany([
            {
                userId: users[0]._id.toString(),
                type: 'run',
                durationMinutes: 35,
                calories: 420,
                notes: 'Morning jog near the river',
            },
            {
                userId: users[1]._id.toString(),
                type: 'strength',
                durationMinutes: 50,
                calories: 610,
                notes: 'Upper-body focus',
            },
            {
                userId: users[2]._id.toString(),
                type: 'mobility',
                durationMinutes: 25,
                calories: 180,
                notes: 'Stretch and recovery',
            },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            { userId: users[0]._id.toString(), score: 1280, rank: 1, streak: 5 },
            { userId: users[1]._id.toString(), score: 1110, rank: 2, streak: 3 },
            { userId: users[2]._id.toString(), score: 1045, rank: 3, streak: 2 },
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'Core Circuit',
                difficulty: 'beginner',
                durationMinutes: 20,
                focus: 'Abs and posture',
                equipment: ['mat'],
            },
            {
                title: 'HIIT Intervals',
                difficulty: 'advanced',
                durationMinutes: 30,
                focus: 'Cardio and power',
                equipment: ['jump rope'],
            },
            {
                title: 'Recovery Flow',
                difficulty: 'beginner',
                durationMinutes: 18,
                focus: 'Mobility and recovery',
                equipment: ['yoga mat'],
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map