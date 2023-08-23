var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Course = require('../models/course');

// POST: Create a new user. Respond with details of new user
router.post("/", function(req, res, next) {
    var userData = new User({
        uid: req.body.uid,
        savedCourses: req.body.savedCourses
    });
    userData.save(function(err, post) {
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

// GET: Respond with a list of users
router.get('/', function(req, res, next) {
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
    User.find().where(where).sort(sort).select(select).skip(skip).limit(limit).exec(function(err, users) {
        if (err) {
            res.status(500).send({
                message: "Server Error!",
                data: []
            });
        } else {
            if (count) {
                res.status(200).send({
                    message: "Success",
                    data: users.length
                });
            } else {
                res.status(200).send({
                    message: "Success",
                    data: users
                });
            }
        }
    });
});

// GET by id
router.get("/:id", function(req, res, next) {
    User.findById(req.params.id, function(err, user, next) {
        User.findById(req.params.id, function(err, user, next) {
            if (err) {
                res.status(500).send({
                    message: "Server Error!",
                    data: err
                });
            } else if (!user) {
                res.status(404).send({
                    message: "Not found",
                    data: req.params.id
                });
            } else {
                res.status(200).send({
                    message: "Success",
                    data: user
                });
            }
        });
    })
});

// PUT: Replace entire user with supplied user or 404 error
router.put("/:id", function(req, res, next) {
    User.findById(req.params.id, function(err, user, next) {
        if (err) {
            res.status(500).send({
                message: "Server Error!",
                data: err
            });
        } else if (!user) {
            res.status(404).send({
                message: "Not found",
                data: req.params.id
            });
        } else {
            // Update
            User.findByIdAndUpdate(req.params.id, req.body, function(err1, user1, next) {
                if (err1) {
                    // catch any errors
                    res.status(500).send({
                        message: "Server Error!",
                        data: err1
                    });
                } else {
                    res.status(200).send({
                        message: "Success",
                        data: req.body // shows data changed
                    });
                }
            });
        }
    });
});

// DELETE by id
router.delete("/:id", function(req, res, next) {
    User.findById(req.params.id, function(err, user, next) {
        if (err) {
            res.status(500).send({
                message: "Server Error!",
                data: err
            });
        } else if (!user) {
            res.status(404).send({
                message: "Not found",
                data: req.params.id
            });
        } else {
            // delete
            User.deleteOne({_id: req.params.id}, function(err1, user1, next) {
                if (err1) {
                    res.status(500).send({
                        message: "Server Error!",
                        data: err1
                    });
                } else {
                    res.status(200).send({
                        message: "Success",
                        data: user1
                    });
                }
            });
        }
    });
});


module.exports = router;
