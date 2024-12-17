const Career = require("../model/careerSchema");

const { validationResult } = require("express-validator"); // Validation library

// Helper to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// POST: Submit Career Form
exports.submitCareerForm = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  // console.log(req.body);
  // Validate input using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    skills,
    careerChoice,
    yearsOfExperience,
    education,
    jobInterests,
    location,
  } = req.body;

  // Check if required fields are missing
  if (!careerChoice || !yearsOfExperience || !education) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newCareer = new Career({
    user: userId,
    skills,
    careerChoice,
    yearsOfExperience,
    education,
    jobInterests,
    location,
  });

  // Save career data to database
  await newCareer.save();

  res.status(201).json({
    message: "Career data submitted successfully",
    data: newCareer,
  });
});

exports.getCareerData = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT payload
    const { page = 1, limit = 10, careerChoice } = req.query;

    // Validate pagination inputs
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res.status(400).json({
        success: false,
        message: "Pagination parameters must be positive numbers",
      });
    }

    // Filter by user and optional careerChoice
    const filter = { user: userId };
    if (careerChoice) filter.careerChoice = careerChoice;

    const careerData = await Career.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Career.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Career data retrieved successfully",
      data: careerData,
      totalCount: total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.editCareerForm = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { careerId } = req.params; // Get career ID from request params
  const {
    skills,
    careerChoice,
    yearsOfExperience,
    education,
    jobInterests,
    location,
  } = req.body;

  // Validate input using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if required fields are missing
  if (!careerChoice || !yearsOfExperience || !education) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Find the Career document by ID and user ID to ensure it's the correct user
  const career = await Career.findOne({ _id: careerId, user: userId });
  if (!career) {
    return res
      .status(404)
      .json({ message: "Career data not found or access denied" });
  }

  // Update the career form with new data
  career.skills = skills || career.skills;
  career.careerChoice = careerChoice || career.careerChoice;
  career.yearsOfExperience = yearsOfExperience || career.yearsOfExperience;
  career.education = education || career.education;
  career.jobInterests = jobInterests || career.jobInterests;
  career.location = location || career.location;

  // Optionally, update the preferred industry based on years of experience
  if (yearsOfExperience >= 5) {
    career.preferredIndustry = "Senior-Level Opportunities";
  } else if (yearsOfExperience >= 2) {
    career.preferredIndustry = "Mid-Level Opportunities";
  } else {
    career.preferredIndustry = "Entry-Level Opportunities";
  }

  // Save updated career data
  await career.save();

  res.status(200).json({
    message: "Career data updated successfully",
    data: career,
  });
});
