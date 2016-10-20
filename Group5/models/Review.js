var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Reviews Schema
var ReviewSchema = mongoose.Schema({
   //geolocation: [lat, long],
   title: String,
   user: String, // the user who made this review
   description: String, // the description the user put
   keyword: [String],
   coffee: Boolean,
   bathroom: Boolean,
   outlets: Boolean,
   noise: Boolean,
});

var User = mongoose.model('Review', ReviewSchema);
module.exports = Review;
