const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteer.controller");

router.post("/add",volunteerController.addVolunteers)
router.post("rsvp",volunteerController.rsvp)
router.post("", volunteerController.getAllVolunteers)

module.exports = router;