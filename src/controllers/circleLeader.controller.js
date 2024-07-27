const CircleLeader = require("../models/circleLeader.model");
const Volunteer = require("../models/volunteer.model");
const Student = require("../models/student.model");
const Assignment = require("../models/assignment.model");


exports.getAllCircleLeaders = async (req, res) => {
    const cl = await CircleLeader.find();
    try {
        const cl = await CircleLeader.find();
        res.json(cl);
    } catch (err) {
        res.status(500).json({message: "Internal server error."});
    }

}

exports.matchVolunteersAndStudents = async (req,res) => {
    try {
        const volunteers = await Volunteer.find();
        const students = await Student.find();

        for (const student of students) {
            const matchedVolunteer = volunteers.find(volunteer =>
                volunteer.preferences.some(pref => student.subjects.includes(pref)) &&
                volunteer.classRange.minClass <= student.class &&
                volunteer.classRange.maxClass >= student.class
            );

            if (matchedVolunteer) {
                const ass= new Assignment ({
                    volunteer: matchedVolunteer._id,
                    student: student._id,
                    nextSessionDate:req.body.date,
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

exports.rematch=async(req,res)=>{
    const assignments = await Assignment.find({ rsvp: false }).populate('student volunteer');

    for (const assignment of assignments) {
        const { student } = assignment;
        const volunteers = await Volunteer.find();

        const matchedVolunteer = volunteers.find(volunteer =>
            volunteer._id.toString() !== assignment.volunteer._id.toString() &&
            volunteer.preferences.some(pref => student.subjects.includes(pref)) &&
            volunteer.classRange.minClass <= student.class &&
            volunteer.classRange.maxClass >= student.class
        );

        if (matchedVolunteer) {
            const nextSessionDate = new Date();
            nextSessionDate.setDate(nextSessionDate.getDate() + 7);

            // Create new assignment
            await Assignment.create({
                volunteer: matchedVolunteer._id,
                student: student._id,
                nextSessionDate
            });

            // Remove old assignment
            await Assignment.findByIdAndRemove(assignment._id);
        }
    }
}
