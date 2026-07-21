import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: false },
    goal: { type: String, default: 'Stay active' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, default: 'Fitness' },
    members: [{ type: String }],
    captain: { type: String, required: true },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, required: true },
    equipment: [{ type: String }],
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
