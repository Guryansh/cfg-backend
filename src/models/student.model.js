const mongoose = require('mongoose');
const { Schema } = mongoose;

const DailyLearningSchema = new Schema({
  date: { type: Date, required: true },
  courseName: { type: String, required: true },
  notes: { type: String }
});

const AttendanceSchema = new Schema({
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true }
});


const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  class:{type: Number, required: true, default:1},
  subjects: [{ type: String, required: true }],
  dailyLearningHistory: [DailyLearningSchema],
  attendance: [AttendanceSchema],
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
