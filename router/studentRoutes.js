const express = require('express');
const router = express.Router();
const studentFunction = require('../functions/studentFunction');


const student_attendance=require("./student_attendanceRoute");
const {authenticateToken, authorizeAdmin}=require("../middleware/authToken")
router.use("/attendance",student_attendance)

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const studentId = await studentFunction.createStudent(req.body);
    res.status(200).json({ id: studentId });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create student' });
  }
});

router.get('/', authenticateToken,  async (req, res) => {
  try {
    const student = await studentFunction.getStudents();
    
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get students' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const student = await studentFunction.getStudentById(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to get student' });
  }
});

router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    const studentId = req.params.id;
    const updateData = req.body;
    try {
      const result = await studentFunction.updateStudent(studentId, updateData);
      res.json({ message: 'Student updated successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Error updating student', error });
    }
});

router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const affectedRows = await studentFunction.deleteStudent(req.params.id);
    if (affectedRows.acknowledged === true) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});



router.post('/class/studentbyclass', authorizeAdmin, authenticateToken, async(req,res)=>{
  try{
    const student= await studentFunction.createStudentByClass(req.body);
    if(!student){
      res.status(404).json({error:"Student Not Found"})
    }
    res.status(200).json(student);
  }catch(error){
    res.status(500).json(error)
  }
});

router.get('/class/studentbyclass', authenticateToken, async(req,res)=>{
  try{
    const student= await studentFunction.getStudentByClass(req.body.class_id);
    if(!student){
      res.status(404).json({error:"Student Not Found"})
    }
    res.status(200).json(student);
  }catch(error){
    console.log(error)
    res.status(500).json(error)
  }
});

module.exports = router;
