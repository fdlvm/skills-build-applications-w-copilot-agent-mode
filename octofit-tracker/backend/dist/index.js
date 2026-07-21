"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
};
const apiBaseUrl = getApiBaseUrl();
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl, port });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json({ apiBaseUrl, users });
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json({ apiBaseUrl, user });
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json({ apiBaseUrl, teams });
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json({ apiBaseUrl, team });
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json({ apiBaseUrl, activities });
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json({ apiBaseUrl, activity });
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).sort({ score: -1 }).lean();
    res.json({ apiBaseUrl, leaderboard });
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const leaderboardEntry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json({ apiBaseUrl, leaderboardEntry });
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json({ apiBaseUrl, workouts });
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json({ apiBaseUrl, workout });
});
const startServer = async () => {
    try {
        await database_1.default.asPromise();
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map