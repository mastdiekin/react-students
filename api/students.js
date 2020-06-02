const express = require("express");
const api = express.Router();
const Student = require("../models/Student");
const auth = require("../middleware/auth");

//GET Students
api.get("/", (req, res) => {
  Student.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).render(err));
});

//GET Student by ID
api.get("/:id", (req, res) => {
  const id = req.params.id;
  Student.findOne({ id: id })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//POST Add new student
// api.post("/add", auth, (req, res) => {
api.post("/add", auth, (req, res) => {
  if (req.body.newstudent) {
    req.body = req.body.newstudent;
  }
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
      return res.json(result);
    })

    .catch((err) => res.status(400).send(err));
});

//POST Edit student
api.post("/:id/edit", auth, (req, res) => {
  if (req.body.data) {
    req.body = req.body.data;
  }
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
    .catch((err) => res.status(400).send(err));
});

//POST Delete student
api.post("/:id/delete", auth, (req, res) => {
  const id = req.params.id;
  Student.findOneAndRemove({ id: id })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).send(err));
});

module.exports = api;
