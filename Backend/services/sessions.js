var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Session = mongoose.model('Session');

//Checks if a token exists, and returns the corrosponding user_id
exports.validateSession = function(token, success, fail) {
  Session.findOne({token: token})
    .select('user_id')
    .exec(function(err, session) {
      if (err) {
        fail({
          msg: "Could not search database for session!",
          status: 500
        });
      } else if (!session) {
        fail({
          msg: "Session is not valid!",
          status: 401
        });
      } else {
        success(session.user_id, session);
      }
    });
};

//Creates a token and returns the token if successful
exports.generateSession = function(user_id, success, fail) {
  //Create a random token
  var token = crypto.randomBytes(48).toString('hex');
  //New session!
  new Session({
    user_id: user_id,
    token: token,
    created_at: Date.now()
  }).save(function(err) {
    if (err) {
      fail({
        msg: "Could not add session to DB!",
        status: 500
      });
    } else {
      success(token);
    }
  });
};
