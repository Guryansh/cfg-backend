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
    ass.isArriving = true;
    ass.save();
}


exports.matchVolunteersAndStudents = async (req,res) => {
    try {
        const volunteers = await Volunteer.find();
        const students = await Student.find();

        for (const student of students) {
            const matchedVolunteer = volunteers.find(volunteer =>
                volunteer.preferences.some(pref => student.subjects.includes(pref))
            );

            if (matchedVolunteer) {
                // const nextSessionDate = new Date(); // Example: next session in a week
                nextSessionDate.setDate(nextSessionDate.getDate() + 7);
                const ass= new Assignment ({
                    volunteer: matchedVolunteer._id,
                    student: student._id,
                    nextSessionDate
                });
                ass.save();

                // Optionally, remove the matched volunteer to avoid multiple assignments
                volunteers.splice(volunteers.indexOf(matchedVolunteer), 1);
            }
        }
        res.status(200);
    } catch (err) {
        res.status(500).json({message: "Internal server error."});
    }

};
