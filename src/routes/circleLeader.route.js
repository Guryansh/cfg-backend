const express = require("express");
const router = express.Router();
const circleLeaderController = require("../controllers/circleLeader.controller");

router.get("", circleLeaderController.getAllCircleLeaders)

module.exports = router;
