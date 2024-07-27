const express = require("express");
const router = express.Router();
const circleLeaderController = require("../controllers/circleLeader.controller");
const volunteerController = require("../controllers/volunteer.controller");

router.get("", circleLeaderController.getAllCircleLeaders)
router.get("/map", circleLeaderController.matchVolunteersAndStudents);

module.exports = router;
