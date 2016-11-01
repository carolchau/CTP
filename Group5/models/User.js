var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, index: { unique: true } },
  password: { type: String },
  //sign_ins: [String],
  //reviews: [{type: String}] list of reviews
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

// Creates User
module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
     bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
  });
}

// Checks if passwords match
module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
}
