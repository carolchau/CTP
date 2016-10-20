var mongoose = require('mongoose');

// Review Schema
var ReviewSchema = mongoose.Schema({
  title: String,
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
  }
  coffee: Boolean,
  wifi: Boolean,
  snacks: Boolean,
  tables: Boolean,
  bathroom: Boolean,
  outlets: Boolean,
  noisy: Boolean
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;

// Creates Review
module.exports.createReview = function(newReview, callback) {
  
}