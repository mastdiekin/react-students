const express = require("express");
const api = express.Router();
const Student = require("../models/Student");
const User = require("../models/User");
const auth = require("../middleware/auth");

const ITEMS_PER_PAGE = 5;

//POST Students
api.post("/", (req, res) => {
  // console.log("Current page", req.body.page);
  const page = +req.body.page || 1;

  let totalItems;

  Student.find()
    .countDocuments()
    .then((numOfStudents) => {
      totalItems = numOfStudents;
      return Student.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((students) => {
      res.json({
        data: students,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        postsPerPage: ITEMS_PER_PAGE,
        totalItems,
      });
    })
    .catch((err) => console.log(err));
});

//GET Student by ID
api.get("/:id", (req, res) => {
  const id = req.params.id;
  Student.findOne({ _id: id })
    .select("-password")
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//POST Add new student
// api.post("/add", auth, (req, res) => {
api.post("/add", auth, (req, res) => {
  if (req.body.newstudent) {
    req.body = req.body.newstudent;
  }
  //found user by received decoded in middleware/auth.js
  User.findOne({ _id: req.user.id })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          error: true,
          message: "Author not found",
        });
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
        userId: user,
      });
      return student
        .save()
        .then((result) => {
          return res.json(result);
        })

        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
});

//POST Edit student
api.post("/:id/edit", auth, (req, res) => {
  if (req.body.data) {
    req.body = req.body.data;
  }
  const id = req.params.id;
  //found user by received decoded in middleware/auth.js
  User.findOne({ _id: req.user.id }).then((user) => {
    if (!user) {
      return res.status(400).send({
        error: true,
        message: "Author not found",
      });
    }
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
        student.userId = user;
        return student.save();
      })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(400).send(err));
  });
});

//POST Delete student
api.post("/:id/delete", auth, (req, res) => {
  const id = req.params.id;
  Student.findOneAndRemove({ id: id })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).send(err));
});

module.exports = api;
