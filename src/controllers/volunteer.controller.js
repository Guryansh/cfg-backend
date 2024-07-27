const Volunteer = require('../models/volunteer.model');
const Student = require('../models/student.model');
const Assignment = require('../models/assignment.model');

exports.addVolunteers = async (req, res) => {
    try {
        const vol = new Volunteer(req.body);
        await vol.save();
        res.json(vol);
    } catch (err) {
        res.status(500).json({message: "Internal server error."});
    }

}


exports.getAllVolunteers = async (req, res) => {
    const volunteers = await Volunteer.find();
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({message: "Internal server error."});
    }

}

exports.rsvp = async (req, res) => {
    const volunteer = await Volunteer.findById(req.body.volunteer);
    const ass = await Assignment.findOne({volunteer:volunteer._id});
    ass.rsvp = true;
    ass.save();
}


