// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    uid: {type: String, required: true, unique: true},
    savedCourses: {type: [String], default:[]}
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
