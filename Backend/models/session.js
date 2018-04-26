var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Session = new Schema({
  user_id: {
    type: String
    ref: 'User'
  },
  token: {
    type: String
  }
});

mongoose.model('Session', Session);
