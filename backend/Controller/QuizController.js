const Question = require("../model/Quiz/questionSchema");
const QuizResult = require("../model/Quiz/quizResultSchema");

// Add a new question (Admin only)
exports.addQuestion = async (req, res) => {
  try {
    const { questionText, options, category } = req.body;

    // Ensure valid options are provided
    if (!options || !Array.isArray(options) || options.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two options are required" });
    }

    const question = new Question({ questionText, options, category });
    await question.save();

    res
      .status(201)
      .json({ message: "Question added successfully", data: question });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding question", error: error.message });
  }
};

// Get all questions for the quiz
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ questions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching questions", error: error.message });
  }
};

// Submit the quiz and calculate results
exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Answers must be an array" });
    }

    const questions = await Question.find();

    let score = 0;

    answers.forEach((answer) => {
      const question = questions.find(
        (q) => q._id.toString() === answer.questionId
      );
      if (question) {
        const correctOptions = question.options
          .filter((o) => o.isCorrect)
          .map((o) => o.optionText)
          .sort();
        const userOptions = answer.selectedOptions.sort();

        if (JSON.stringify(correctOptions) === JSON.stringify(userOptions)) {
          score += 1;
        }
      }
    });

    let recommendations = "";
    if (score >= 9) recommendations = "Highly Analytical Personality";
    else if (score >= 5) recommendations = "Balanced Personality";
    else recommendations = "Creative Personality";

    const result = new QuizResult({ score, recommendations });
    await result.save();

    res
      .status(200)
      .json({ message: "Quiz submitted successfully", score, recommendations });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting quiz", error: error.message });
  }
};

exports.getPersonalityResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user.id });
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error });
  }
};
