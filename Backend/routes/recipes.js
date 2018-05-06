var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');
var Session = mongoose.model('Session');

//Create a new link
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
          //json object the a link object contains
          user_id: session.user_id,
					title: req.body.title,
          instructions: req.body.instructions,
          description: req.body.description,
          ingredients: req.body.ingredients,
          notes: req.body.notes,
          created_at: Date.now(),
          updated_at: Date.now()
        }).save(function(err, recipe, count) {
          //.save will save our new link object in the backend
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

//Get all of a user's recipes
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
        Recipe.find({
          user_id: session.user_id
        }).sort('-updated_at').lean().exec(function(err, recipes, count) {
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


//Update a recipe
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
            //Simply change the variables of the recipe
            recipe.title = req.body.title,
            recipe.instructions = req.body.instructions;
            recipe.description = req.body.description;
            recipe.ingredients = req.body.ingredients;
            recipe.notes = req.body.notes;
            recipe.updated_at = Date.now();

            //Save the modified
            recipe.save(function(err, recipe, count) {
              //.save will save our new recipe object in the backend
              res.status(200).json(recipe);
            });
          }
        });
      }
    });
});

//DELETE
//Using the ORM (object relational mapping) which is mongoose
//it will find a recipe by it's mongoose id, and remove it from the backend
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
              }
            });
          }
        });
      }
    });
});

module.exports = router;
