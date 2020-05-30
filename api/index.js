const express = require("express");
const api = express.Router();
const Student = require("../models/Student");

//GET Students //MONGOOSE
api.get("/api/students", (req, res) => {
  Student.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).render(err));
});

//GET Student by ID //MONGOOSE
api.get("/api/students/:id", (req, res) => {
  const id = req.params.id;
  Student.findOne({ id: id })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//POST Add new student //MONGOOSE
api.post("/api/students/add", (req, res) => {
  const student = new Student({
    age: req.body.age,
    name: req.body.name,
    lName: req.body.lName,
    year: req.body.year,
    dateReceipt: req.body.dateReceipt,
    faculty: req.body.faculty,
    course: req.body.course,
    phone: req.body.phone,
    photo: req.body.photo,
    address: req.body.address,
    // userId: req.user, //ВЕРНУТЬ КОГДА БУДУТ ПОЛЬЗОВАТЕЛИ
  });
  return student
    .save()
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch((err) => res.status(400).json(err));
});

//POST Edit student //MONGOOSE
api.post("/api/students/:id/edit", (req, res) => {
  const id = req.params.id;
  Student.findOne({ id: id })
    .then((student) => {
      student.age = req.body.age;
      student.name = req.body.name;
      student.lName = req.body.lName;
      student.year = req.body.year;
      student.dateReceipt = req.body.dateReceipt;
      student.faculty = req.body.faculty;
      student.course = req.body.course;
      student.phone = req.body.phone;
      student.photo = req.body.photo;
      student.address = req.body.address;
      return student.save();
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.status(400).json(err));
});

//POST Delete student //MONGOOSE
api.post("/api/students/:id/delete", (req, res) => {
  const id = req.params.id;
  Student.findOneAndRemove({ id: id })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

module.exports = api;
