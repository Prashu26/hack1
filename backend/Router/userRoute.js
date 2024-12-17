const express = require("express");
const router = express.Router();
const user = require("../Controller/userController");
const { restrict, isAuthenticatedUser } = require("../Middleware/auth");
const upload = require("../Middleware/multur");

router.post("/insert", user.userInsert);
router.post("/login", user.login);
router.get("/logout", user.Logout);
router.get("/me", isAuthenticatedUser, user.getUserDetails);
router.put(
  "/me/update",
  upload.single("profilePhoto"),
  isAuthenticatedUser,
  user.updateProfile
);

router.post("/forgetPassword", user.forgetPassword);
router.put("/resetPassword/:token", user.passwordReset);
router.put("/password/update", isAuthenticatedUser, user.updateUserPassword);

// router.get("/dashboard", isAuthenticatedUser, user.getUserDashboard);

router.post("/select-roadmap", isAuthenticatedUser, user.postUserDashboard);
router.put("/update-progress", isAuthenticatedUser, user.UpdateProgress);
router.get("/dashboard", isAuthenticatedUser, user.getUserDashboard);
router.get("/dashboard/:id", isAuthenticatedUser, user.getSingleUserDashboard);

module.exports = router;
