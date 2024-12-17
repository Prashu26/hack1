const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Optional for guest users
  },
  score: {
    type: Number,
    required: true,
  },
  recommendations: {
    type: String, // Tailored results/recommendations
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QuizResult = mongoose.model("QuizResult", quizResultSchema);
module.exports = QuizResult;
