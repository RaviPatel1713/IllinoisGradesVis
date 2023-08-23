var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Course = require('../models/course');

// POST: Create a new course. Respond with details of new course
router.post("/", function(req, res, next) {
    var courseData = new Course({
        term: req.body.term,
        year: req.body.year,
        students: req.body.students,
        subject: req.body.subject,
        number: req.body.number,
        numAp: req.body.numAp,
        numA: req.body.numA,
        numAm: req.body.numAm,
        numBp: req.body.numBp,
        numB: req.body.numB,
        numBm: req.body.numBm,
        numCp: req.body.numCp,
        numC: req.body.numC,
        numCm: req.body.numCm,
        numDp: req.body.numDp,
        numD: req.body.numD,
        numDm: req.body.numDm,
        numF: req.body.numF,
        numW: req.body.numW,
        courseTitle: req.body.courseTitle,
        instructor: req.body.instructor,
        avgGPA: req.body.avgGPA
    });
    courseData.save(function(err, post) {
       if (err) {
        res.status(500).send({
            message: "Server Error!",
            data: err
        });
       } else {
        res.status(201).send({
            message: "Created",
            data: post
        });
       }
    });
});

// GET: by id respond with details of specified course
router.get("/:id", function(req, res, next) {
    Course.findById(req.params.id, function(err, course, next) {
        if (err) {
            res.status(500).send({
                message: "Server Error!",
                data: err
            });
        } else if (!course) {
            res.status(404).send({
                message: "Not found",
                data: req.params.id
            });
        } else {
            res.status(200).send({
                message: "Success",
                data: course
            });
        }
    });
});

// GET: Respond with a list of courses
router.get("/", function(req, res, next) {
    var where = {};
    var sort = {};
    var select = {};
    var skip = 0;
    var limit = 100; //default
    var count = false;
    if ("where" in req.query) {
        where = JSON.parse(req.query.where);
    }
    if ("sort" in req.query) {
        sort = JSON.parse(req.query.sort);
    }
    if ("select" in req.query) {
        select = JSON.parse(req.query.select);
    }
    if ("skip" in req.query) {
        skip = JSON.parse(req.query.skip);
    }
    if ("limit" in req.query) {
        limit = JSON.parse(req.query.limit);
    }
    if ("count" in req.query) {
        count = JSON.parse(req.query.count);
    }
    Course.find().where(where).sort(sort).select(select).skip(skip).limit(limit).exec(function(err, courses) {
        if (err) {
            res.status(500).send({
                message: "Server Error!",
                data: []
            });
        } else {
            if (count) {
                res.status(200).send({
                    message: "Success",
                    data: courses.length
                });
            } else {
                res.status(200).send({
                    message: "Success",
                    data: courses
                });
            }
        }
    });
});


// DELETE: Delete specified user or 404 error
router.delete("/:id", function(req, res, next) {
    // remove the courses
    Course.findById(req.params.id, function(err, course, next) {
        if (err) {
            res.status(500).send({
                message: "Server Error!",
                data: err
            });
        } else if (!course) {
            res.status(404).send({
                message: "Not found",
                data: req.params.id
            });
        } else {
            // delete
            Course.deleteOne({_id: req.params.id}, function(err1, courses1, next) {
                if (err1) {
                    res.status(500).send({
                        message: "Server Error!",
                        data: err1
                    });
                } else {
                    res.status(200).send({
                        message: "Success",
                        data: course
                    });
                }
            });
        }
    });
});


module.exports = router;
