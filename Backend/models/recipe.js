var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipe = new Schema({
  title: {
    type: String
  },
  token: {
    type: String
  }
});

mongoose.model('Session', Session);
