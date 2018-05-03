var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  name: {
    type: String
  },
  created_at: {
    type: Date
  }
});

mongoose.model('User', User);
