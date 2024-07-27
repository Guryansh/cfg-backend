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

const FeedbackSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comments: { type: String }
});

const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: [{ type: String, required: true }],
  dailyLearningHistory: [DailyLearningSchema],
  attendance: [AttendanceSchema],
  feedbackForms: [FeedbackSchema]
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
