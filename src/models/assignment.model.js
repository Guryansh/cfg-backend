const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    assignedDate: { type: Date, default: Date.now },
    nextSessionDate: { type: Date, required: true }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);