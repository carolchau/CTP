var mongoose = require('mongoose');

// Location Schema
var LocationSchema = mongoose.Schema({
  title: { type: String, required: true },
  desc : { type : String, required : false },
  loc: {
    type: { type : String },
    coordinates: [Number]
  } // must be [long, lat]
});

LocationSchema.index({ "loc": "2dsphere" });

var Location = mongoose.model('Location', LocationSchema);
module.exports = Location;
