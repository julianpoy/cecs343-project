var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + (process.env.DB || 'cecs343'));
