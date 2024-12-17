const express = require("express");
const router = express.Router();
const careerController = require("../Controller/CareerController");
const { restrict, isAuthenticatedUser } = require("../Middleware/auth");

router.post("/career", isAuthenticatedUser, careerController.submitCareerForm);

router.get("/career", isAuthenticatedUser, careerController.getCareerData);
router.put(
  "/career/:careerId",
  isAuthenticatedUser,
  careerController.editCareerForm
);

module.exports = router;
