const express = require("express");
const router = express.Router();
const roadmapController = require("../Controller/roadmapController");
const upload = require("../Middleware/multur");
const { restrict, isAuthenticatedUser } = require("../Middleware/auth");

// POST: Create a new career roadmap
router.post(
  "/roadmap",
  upload.single("image"),
  roadmapController.createRoadmap
);

// GET: Retrieve all career roadmaps
router.get("/roadmaps", roadmapController.getAllRoadmaps);

// GET: Retrieve a single career roadmap by its ID
router.get("/roadmap/:id", roadmapController.getRoadmapById);

// PUT: Update a career roadmap by its ID
router.put("/roadmap/:id", roadmapController.updateRoadmap);

// DELETE: Delete a career roadmap by its ID
router.delete("/roadmap/:id", roadmapController.deleteRoadmap);

router.get(
  "/user/progress/:roadmapId",
  isAuthenticatedUser,
  roadmapController.getUserRoadmap
);

// router.put(
//   "/update-progress",
//   isAuthenticatedUser,
//   roadmapController.updateRoadmapProgress
// );
// router.put(
//   "/markStepAsComplete",
//   isAuthenticatedUser,
//   roadmapController.getRoadmapProgress
// );

module.exports = router;
