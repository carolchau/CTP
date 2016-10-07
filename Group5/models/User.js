var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: {type: String}, // how does hashing work?
  sign_ins: [String],
  //reviews: [{type: String}] list of reviews
});

var User = mongoose.model('user', userSchema);
module.exports = User;
