var mongoose = require('mongoose');

mongoose.connect('mongodv://localhost');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
