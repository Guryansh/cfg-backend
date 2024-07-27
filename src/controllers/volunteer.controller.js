const Volunteer = require('../models/volunteer.model');
const Student = require('../models/user.model');
const Assignment = require('../models/assignment.model');

exports.matchVolunteersAndStudents = async () => {
    const volunteers = await Volunteer.find();
    const students = await Student.find();

    for (const student of students) {
        const matchedVolunteer = volunteers.find(volunteer =>
            volunteer.preferences.some(pref => student.subjects.includes(pref))
        );

        if (matchedVolunteer) {
            const nextSessionDate = new Date(); // Example: next session in a week
            nextSessionDate.setDate(nextSessionDate.getDate() + 7);

            await Assignment.create({
                volunteer: matchedVolunteer._id,
                student: student._id,
                nextSessionDate
            });

            // Optionally, remove the matched volunteer to avoid multiple assignments
            volunteers.splice(volunteers.indexOf(matchedVolunteer), 1);
        }
    }
};
