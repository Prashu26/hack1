const Roadmap = require("../model/roadmapSchema");
const User = require("../model/userModel");

exports.createRoadmap = [
  // Use multer to handle the image upload before the controller logic
  async (req, res) => {
    try {
      const { careerTitle, description } = req.body;
      const roadmapSteps = JSON.parse(req.body.roadmapSteps);

      // Get the image file path (if uploaded)
      const image = req.file ? req.file.filename : null; // Save only the filename

      // Validate required fields
      if (!careerTitle || !description || !roadmapSteps) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields." });
      }

      // Create the roadmap document and include the image file name
      const roadmap = new Roadmap({
        careerTitle,
        description,
        roadmapSteps,
        image, // Save only the image file name
      });

      // Save the roadmap to the database
      await roadmap.save();

      // Respond with success message and the roadmap object
      res
        .status(201)
        .json({ message: "Roadmap created successfully", roadmap });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating roadmap", error: error.message });
    }
  },
];

// GET: Retrieve all career roadmaps
exports.getAllRoadmaps = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page

    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ message: "Page and limit must be positive integers" });
    }

    const skip = (page - 1) * limit;

    // Get total count of documents
    const totalCount = await Roadmap.countDocuments();

    // Get roadmaps for the current page
    const roadmaps = await Roadmap.find().skip(skip).limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      roadmaps,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching roadmaps", error: error.message });
  }
};

// GET: Retrieve a single career roadmap by its ID
exports.getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    res.status(200).json(roadmap);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching roadmap", error: error.message });
  }
};

// PUT: Update a career roadmap by its ID
exports.updateRoadmap = async (req, res) => {
  try {
    const { careerTitle, description, roadmapSteps } = req.body;

    let imageUrl = "";

    // If an image is provided, handle the upload
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // Assuming the image is stored in 'uploads/' folder
    }

    // Check if all required fields are provided
    if (!careerTitle || !description || !roadmapSteps) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    // If imageUrl exists, we update it as well
    const updatedRoadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      {
        careerTitle,
        description,
        roadmapSteps,
        image: imageUrl || undefined, // If no image is provided, we don't update the image field
      },
      { new: true }
    );

    // If no roadmap is found, return 404
    if (!updatedRoadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    // Return the updated roadmap
    res.status(200).json({
      message: "Roadmap updated successfully",
      updatedRoadmap,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating roadmap",
      error: error.message,
    });
  }
};

// DELETE: Delete a career roadmap by its ID
exports.deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndDelete(req.params.id);

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    res.status(200).json({ message: "Roadmap deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting roadmap", error: error.message });
  }
};

exports.getUserRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params; // Extract the roadmapId from URL

    // Assuming user information is stored in the session or JWT token
    const userId = req.user._id; // Access user ID from authentication middleware

    // Fetch the user data and look for their selected roadmaps
    const user = await User.findById(userId).select("selectedRoadmaps");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has selected the roadmap
    const selectedRoadmap = user.selectedRoadmaps.find(
      (roadmap) => roadmap.roadmapId.toString() === roadmapId
    );

    if (!selectedRoadmap) {
      return res
        .status(404)
        .json({ message: "Progress for this roadmap not found" });
    }

    // Accessing roadmapSteps inside userSpecificRoadmap
    const roadmapSteps =
      selectedRoadmap.userSpecificRoadmap?.roadmapSteps || [];

    // If roadmapSteps is undefined or empty, handle accordingly
    const completedSteps = roadmapSteps
      .filter((step) => step.completed) // Filter out completed steps
      .map((step) => ({
        stepId: step._id,
        stepTitle: step.stepTitle,
        stepDescription: step.stepDescription,
        completed: step.completed,
      }));

    // Return the user's completed steps
    return res.json({
      completedSteps: completedSteps || [], // Empty array if no steps completed
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// exports.updateRoadmapProgress = async (req, res) => {
//   // console.log(req.body);
//   try {
//     const { roadmapId, stepIndex } = req.body;
//     const userId = req.user.id; // Extracted from the authenticated token

//     const user = await User.findById(userId);

//     const roadmapProgress = user.selectedRoadmaps.find(
//       (progress) => progress.roadmapId.toString() === roadmapId
//     );

//     if (!roadmapProgress) {
//       // Initialize roadmap progress if not found
//       user.selectedRoadmaps.push({ roadmapId, stepsCompleted: [stepIndex] });
//     } else {
//       const steps = roadmapProgress.stepsCompleted;
//       if (steps.includes(stepIndex)) {
//         // Remove step if already completed
//         roadmapProgress.stepsCompleted = steps.filter(
//           (step) => step !== stepIndex
//         );
//       } else {
//         // Add step to completed steps
//         roadmapProgress.stepsCompleted.push(stepIndex);
//       }
//     }

//     await user.save();
//     res.status(200).json({ message: "Progress updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Fetch progress with roadmap details
// exports.getRoadmapProgress = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).populate(
//       "selectedRoadmaps.roadmapId"
//     );

//     const progress = user.selectedRoadmaps.map((item) => ({
//       roadmap: item.roadmapId,
//       stepsCompleted: item.stepsCompleted,
//     }));

//     res.status(200).json(progress);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { updateRoadmapProgress, getRoadmapProgress };
