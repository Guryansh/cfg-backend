const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller'); // Adjust the path as needed

router.post('/students', studentController.createStudent);
router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudentById);
router.delete('/students/:id', studentController.deleteStudentById);
router.get('/map/:id', studentController.getTimetable)
module.exports = router;
