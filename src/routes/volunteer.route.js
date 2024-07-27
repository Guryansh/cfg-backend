const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteer.controller");

router.post("/add",volunteerController.addVolunteers)
router.get("/map", volunteerController.matchVolunteersAndStudents);

module.exports = router;