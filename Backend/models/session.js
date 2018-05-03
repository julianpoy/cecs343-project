var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Session = new Schema({
  user_id: {
    type: String,
    ref: 'User'
  },
  token: {
    type: String
  },
  created_at: {
    type: Date
  }
});

mongoose.model('Session', Session);
