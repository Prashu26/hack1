const express = require("express");
const {
  addQuestion,
  getQuestions,
  submitQuiz,
} = require("../Controller/QuizController");

const router = express.Router();

const Quiz = require("../Controller/QuizController");
const { restrict, isAuthenticatedUser } = require("../Middleware/auth");

// Admin Routes
router.post("/admin/question", Quiz.addQuestion);

// User Routes
router.get("/quiz", Quiz.getQuestions);
router.post("/quiz/submit", Quiz.submitQuiz);

router.get(
  "/personality/results",
  isAuthenticatedUser,
  Quiz.getPersonalityResults
);

module.exports = router;
