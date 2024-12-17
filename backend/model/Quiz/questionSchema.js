const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: { type: String, required: true },
      isCorrect: { type: Boolean, default: false },
    },
  ],
  category: {
    type: String, // Optional: To group questions by topics
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
