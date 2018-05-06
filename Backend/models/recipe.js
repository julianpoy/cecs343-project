var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipe = new Schema({
  user_id: {
    type: String
  },
  title: {
    type: String
  },
  instructions: {
    type: String
  },
  description: {
    type: String
  },
  ingredients: {
    type: String
  },
  notes: {
    type: String
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
});

mongoose.model('Recipe', Recipe);
