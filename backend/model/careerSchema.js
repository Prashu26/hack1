const mongoose = require("mongoose");
var validator = require("email-validator");

const careerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  careerChoice: {
    type: String,
    enum: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "AI/ML Engineer",
      "DevOps Engineer",
      "App Developer",
      "Cloud Computing Engineer",
      "Data Scientist",
      "Game Developer",
      "Other",
    ],
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  jobInterests: [
    {
      type: String,
      required: true,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to set preferredIndustry dynamically based on yearsOfExperience
careerSchema.pre("save", function (next) {
  if (this.yearsOfExperience >= 5) {
    this.preferredIndustry = "Senior-Level Opportunities";
  } else if (this.yearsOfExperience >= 2) {
    this.preferredIndustry = "Mid-Level Opportunities";
  } else {
    this.preferredIndustry = "Entry-Level Opportunities";
  }
  next();
});

// Create and export the model
const Career = mongoose.model("Career", careerSchema);
module.exports = Career;
