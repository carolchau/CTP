var mongoose = require('mongoose');

// Review Schema
var ReviewSchema = mongoose.Schema({
  title: { type: String, required: true },
  loc: { type: [Number], index: '2d', required: true }, // must be [long, lat]
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
// module.exports.createReview = function(newReview, callback) {
//   newReview.save(callback);
// }
