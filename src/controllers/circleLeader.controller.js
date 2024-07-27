const CircleLeader = require("../models/circleLeader.model");


exports.getAllCircleLeaders = async (req, res) => {
    const cl = await CircleLeader.find();
    try {
        const cl = await CircleLeader.find();
        res.json(cl);
    } catch (err) {
        res.status(500).json({message: "Internal server error."});
    }

}