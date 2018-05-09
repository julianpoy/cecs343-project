var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');
var Session = mongoose.model('Session');

router.post('/', function(req, res) {
  Session.findOne({
      token: req.query.token
    })
    .select('user_id')
    .exec(function(err, session) {
      if (err) {
        res.status(500).json({
          msg: "Couldn't search the database for session!"
        });
      } else if (!session) {
        res.status(401).json({
          msg: "Session is not valid!"
        });
      } else {
        new Recipe({
          user_id: session.user_id,
					title: req.body.title,
          instructions: req.body.instructions,
          description: req.body.description,
          ingredients: req.body.ingredients,
          notes: req.body.notes,
          created_at: Date.now(),
          updated_at: Date.now(),
          is_public: req.body.isPublic
        }).save(function(err, recipe, count) {
          if (err) {
            res.status(500).json({
              msg: "Error saving the recipe!"
            });
          } else {
            recipe = recipe.toObject();
            res.status(201).json(recipe);
          }
        });
      }
    });
});

router.post('/copy/:id', function(req, res) {
  Session.findOne({
      token: req.query.token
    })
    .select('user_id')
    .exec(function(err, session) {
      if (err) {
        res.status(500).json({
          msg: "Couldn't search the database for session!"
        });
      } else if (!session) {
        res.status(401).json({
          msg: "Session is not valid!"
        });
      } else {
        Recipe.findOne({
          _id: req.params.id,
          $or: [ { user_id: session.user_id }, { is_public: true } ]
        }).exec(function(err, recipe) {
          if (err) {
            res.status(500).json({
              msg: "Couldn't search the database for recipes!"
            });
          } else if(!recipe) {
            res.status(404).json({
              msg: "The recipe requested does not exist or is not visible to you!"
            });
          } else {
            new Recipe({
              user_id: session.user_id,
              title: recipe.title,
              instructions: recipe.instructions,
              description: recipe.description,
              ingredients: recipe.ingredients,
              notes: recipe.notes,
              created_at: Date.now(),
              updated_at: Date.now(),
              is_public: false
            }).save(function(err, newRecipe, count) {
              if (err) {
                res.status(500).json({
                  msg: "Error saving the recipe!"
                });
              } else {
                newRecipe = newRecipe.toObject();
                res.status(201).json(newRecipe);
              }
            });
          }
        });
      }
    });
});

router.get('/', function(req, res) {
  Session.findOne({
      token: req.query.token
    })
    .select('user_id')
    .exec(function(err, session) {
      if (err) {
        res.status(500).json({
          msg: "Couldn't search the database for session!"
        });
      } else if (!session) {
        res.status(401).json({
          msg: "Session is not valid!"
        });
      } else {
        var query;
        if (req.query.listPublic) {
          query = {
            is_public: true
          };
        } else {
          query = {
            user_id: session.user_id
          };
        }

        Recipe
          .find(query)
          .populate('user_id', 'screenname')
          .sort('-updated_at')
          .lean()
          .exec(function(err, recipes, count) {
          if (err) {
            res.status(500).json({
              msg: "Couldn't search the database for recipes!"
            });
          } else {
            res.status(200).json(recipes);
          }
        });
      }
    });
});

router.get('/export', function(req, res) {
  Session.findOne({
      token: req.query.token
    })
    .select('user_id')
    .exec(function(err, session) {
      if (err) {
        res.status(500).json({
          msg: "Couldn't search the database for session!"
        });
      } else if (!session) {
        res.status(401).json({
          msg: "Session is not valid!"
        });
      } else {
        Recipe.find({
          user_id: session.user_id
        }).sort('-updated_at').lean().exec(function(err, recipes, count) {
          if (err) {
            res.status(500).json({
              msg: "Couldn't search the database for recipes!"
            });
          } else {
            var data = JSON.stringify(recipes);
            res.setHeader('Content-disposition', 'attachment; filename= recipe-export.rme');
            res.setHeader('Content-type', 'application/json');
            res.write(data, function (err) {
              res.end();
            });
          }
        });
      }
    });
});

router.get('/:id', function(req, res) {
  Session.findOne({
      token: req.query.token
    })
    .select('user_id')
    .exec(function(err, session) {
      if (err) {
        res.status(500).json({
          msg: "Couldn't search the database for session!"
        });
      } else if (!session) {
        res.status(401).json({
          msg: "Session is not valid!"
        });
      } else {
        Recipe.findOne({
          _id: req.params.id,
          $or: [{ user_id: session.user_id }, { is_public: true }]
        }).populate('user_id', 'screenname').lean().exec(function(err, recipe) {
          if (err) {
            res.status(500).json({
              msg: "Couldn't search the database for recipes!"
            });
          } if (!recipe) {
            res.status(404).json({
              msg: "Not found or no permissions to view"
            });
          } else {
            recipe.is_mine = recipe.user_id._id.toString() === session.user_id.toString();
            res.status(200).json(recipe);
          }
        });
      }
    });
});

router.put('/:id', function(req, res) {
  Session.findOne({
      token: req.query.token
    })
    .select('user_id')
    .exec(function(err, session) {
      if (err) {
        res.status(500).json({
          msg: "Couldn't search the database for session!"
        });
      } else if (!session) {
        res.status(401).json({
          msg: "Session is not valid!"
        });
      } else {
        Recipe.findOne({
          _id: req.params.id,
          user_id: session.user_id
        }, function(err, recipe) {
          if (err) {
            res.status(500).json({
              msg: "Couldn't search the database for recipe!"
            });
          } else if (!recipe) {
            res.status(404).json({
              msg: "Recipe does not exist!"
            });
          } else {
            recipe.title = req.body.title,
            recipe.instructions = req.body.instructions;
            recipe.description = req.body.description;
            recipe.ingredients = req.body.ingredients;
            recipe.notes = req.body.notes;
            recipe.updated_at = Date.now();
            recipe.is_public = req.body.is_public;

            recipe.save(function(err, recipe, count) {
              res.status(200).json(recipe);
            });
          }
        });
      }
    });
});

router.delete('/:id', function(req, res) {
  Session.findOne({
      token: req.query.token
    })
    .select('user_id')
    .exec(function(err, session) {
      if (err) {
        res.status(500).json({
          msg: "Couldn't search the database for session!"
        });
      } else if (!session) {
        res.status(401).json({
          msg: "Session is not valid!"
        });
      } else {
        Recipe.findOne({
          _id: req.params.id,
          user_id: session.user_id
        }, function(err, recipe) {
          if (err) {
            res.status(500).json({
              msg: "Couldn't search the database for recipe!"
            });
          } else if (!recipe) {
            res.status(404).json({
              msg: "Recipe does not exist!"
            });
          } else {
            recipe.remove(function(err, recipe) {
              if (err) {
                res.status(500).json({
                  msg: "Couldn't delete recipe from database"
                });
              } else {
                res.status(200).send("ok");
              }
            });
          }
        });
      }
    });
});

module.exports = router;
