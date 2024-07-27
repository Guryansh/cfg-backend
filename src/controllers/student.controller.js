const Student = require('../models/student.model'); // Adjust the path as needed
const Assignment = require('../models/assignment.model');
// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Read all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Read a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({error: 'Student not found'});
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Update a student by ID
exports.updateStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!student) {
            return res.status(404).json({error: 'Student not found'});
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Delete a student by ID
exports.deleteStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({error: 'Student not found'});
        }
        res.status(200).json({message: 'Student deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


exports.getTimetable = async (req, res) => {
    try {
        const studentId = req.params.id;
        const assignments = await Assignment.find({student: studentId})
            .populate('volunteer')
            .populate('student');

        let timetable = Array(7).fill(null);

        assignments.forEach(assignment => {
            const dayOfWeek = assignment.nextSessionDate.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
            timetable[dayOfWeek] = {
                volunteer: assignment.volunteer.name,
                subject: assignment.volunteer.preferences.filter(pref => assignment.student.subjects.includes(pref)),
                nextSessionDate: assignment.nextSessionDate
            };
        });

        res.status(200).send(timetable);
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching the timetable'});
    }
}
