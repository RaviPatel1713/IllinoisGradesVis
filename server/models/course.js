// Load required packages
var mongoose = require('mongoose');

// Define our Course schema
var CourseSchema = new mongoose.Schema({
    // Term,Year,Students,Subject,Number,A+,A,A-,B+,B,B-,C+,C,C-,D+,D,D-,F,W,Course Title,Primary Instructor,GPA
    term: {type: String, required: true},
    year: {type: Number, required: true},
    students: {type: Number, required: true},
    subject: {type: String, required: true},
    number: {type: Number, required: true},
    numAp: {type: Number, required: true},
    numA: {type: Number, required: true},
    numAm: {type: Number, required: true},
    numBp: {type: Number, required: true},
    numB: {type: Number, required: true},
    numBm: {type: Number, required: true},
    numCp: {type: Number, required: true},
    numC: {type: Number, required: true},
    numCm: {type: Number, required: true},
    numDp: {type: Number, required: true},
    numD: {type: Number, required: true},
    numDm: {type: Number, required: true},
    numF: {type: Number, required: true},
    numW: {type: Number, required: true},
    courseTitle: {type: String, required: true},
    instructor: {type: String, required: true},
    avgGPA: {type: Number, required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('Course', CourseSchema);
