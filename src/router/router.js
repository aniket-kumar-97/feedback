const express = require("express");
const router = express.Router();
const userService = require("../service/userService")

router.post("/api/v1/signup", userService.signup);
router.post("/api/v1/login", userService.login);
router.post("/api/v1/create-customer-feedback", userService.customerFeedback);
router.get("/api/v1/feedbackByUserId/:userId", userService.getFeedbackByUserId);

module.exports = router;
