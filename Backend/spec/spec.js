var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
const app = require('../app.js');
let server;

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Session = mongoose.model('Session');
var Recipe = mongoose.model('Recipe');

before(done => {
  server = app.listen(3000, function() {
    setTimeout(done, 1000);
  });
});

var testUser;
var testSession;
var testRecipe;
beforeEach(function(done) {
  this.timeout(5000);
  mongoose.connection.db.dropDatabase(function() {
    new User({
      screenname: 'testing',
      username: 'existing@existing.com',
      // Example password is testing
      password: '50bqt83i7f8PgqbdCZ79zLciDIeizmL/NOzWtCCke1ITSJ2KkYRBdsJ9rHn9ADr9pV4eXYAdN9OhyrVB0+mEex7ejJqdozD8Ui+4ZTxLbuL3rtXbzq87wL+GmJPNVEUrCLpJbcBAqNytiSI7b05JTYmwMA7JwuMJrtOMGNSq2U3LCzNQvNii0xVCb5q7/6WGy8dm8Ycoq/C7Hb4ogyNqIA7KJqLA5k3HKszR/NOh0logJ5g2D5EfKEyB98z40UVKi/BEx3Oj+WtAGtLKFhkqGSLu9OwVj7JTX5mzs1sxbGv17wjj9Q1OK/ngfehyjuwgW9KC4gcReJfzQ00XMGHvrpMuiRC5gm6ZsvATLqPC8tgxFL+k/gOllSeyoJTv6+d6p6T/fKoC9g6kiTD8cX/Mh056MvLtq7+lBFspQGuNwti1DUeiuHBcR66mEuxpiWV7OUzl+3zlBCCTucmgw3SmUQFN1dqbgXDkY/s8EG61c+xHXZXMximn30n7QUGBsput4qADLeLDR9n0Kneyl7whdasP1E77ssmmijFnUHMI+cRAp2hNdgYMgT/DuXJt5cIttfn1cTQd6em9cwNjbs/xY6B/d52AgK0dBrPXOU/RJCj0Oh1DSqBJVqSoTENkzhND3js6cAOBCQN5mjR0PLWhfgkIEDqspUKS84uXo9D9M04=',
      salt: 'I6MUBnc5iWvZIklPYUCPVTjersTsoDJLpE7iE4jH7+PRVF5EVffJ9gmzydQYjpZZhlKUlbknyvNV4+TAxCi3Fc6LXqKQSEFpWoSPyMP/nagAVo2mlQ6wuwbDH6A/wvhKc2Btz0n0hZAofJOBXM9ZTSaU/Sfjiq9bCYURNdC81Ys='
    }).save(function(err, newUser) {
      testUser = newUser;

      new Session({
        token: 'token',
        user_id: testUser._id
      }).save(function(err, newSession) {
        testSession = newSession;

        new Recipe({
          title: 'testing1',
          instructions: 'testing2',
          description: 'testing3',
          ingredients: 'testing4',
          notes: 'testing5',
          user_id: testUser._id
        }).save(function(err, newRecipe) {
          testRecipe = newRecipe;
          done();
        });
      });
    });
  });
});

describe('user routes', function() {
  // Join
  it('can create user', function(done) {
    request(server)
    .post('/users/join')
    .send({
      screenname: 'testing',
      username: 'test@test.com',
      password: 'testing'
    })
    .expect(200)
    .end(function(err, response) {
      expect(response.body.token).to.be.an('string');
      
      User.findOne({ username: 'test@test.com' }).exec(function(err, user) {
        expect(user.screenname).to.equal('testing');
        done();
      });
    });
  });
  it('cannot create duplicate user', function(done) {
    request(server)
    .post('/users/join')
    .send({
      screenname: 'testing',
      username: testUser.username,
      password: 'testing'
    })
    .expect(406)
    .end(done);
  });
  it('cannot create user with invalid email', function(done) {
    request(server)
    .post('/users/join')
    .send({
      screenname: 'testing',
      username: 'invalid',
      password: 'testing'
    })
    .expect(412)
    .end(done);
  });
  
  // Login
  it('can login user', function(done) {
    request(server)
    .post('/users/login')
    .send({
      username: testUser.username,
      password: 'testing'
    })
    .expect(200)
    .end(function(err, response) {
      expect(response.body.token).to.be.an('string');
      
      User.findById(testUser._id).exec(function(err, user) {
        expect(user.screenname).to.equal(testUser.screenname);
        done();
      });
    });
  });
  it('cannot login user with incorrect email', function(done) {
    request(server)
    .post('/users/login')
    .send({
      username: 'invalid',
      password: 'testing'
    })
    .expect(401)
    .end(done);
  });
  it('cannot login user with wrong password', function(done) {
    request(server)
    .post('/users/login')
    .send({
      username: testUser.username,
      password: 'invalid'
    })
    .expect(401)
    .end(done);
  });
  
  // Update
  it('can update user', function(done) {
    request(server)
    .put('/users?token=' + testSession.token)
    .send({
      screenname: 'updated',
      username: 'updated@updated.com',
      password: 'updated'
    })
    .expect(200)
    .end(function(err, response) {
      expect(response.body.nModified).to.equal(1);
      
      User.findById(testUser._id).exec(function(err, user) {
        expect(user.screenname).to.equal('updated');
        expect(user.username).to.equal('updated@updated.com');
        expect(user.password).to.not.equal(testUser.password);
        expect(user.salt).to.not.equal(testUser.salt);
        done();
      });
    });
  });
  it('cannot update user with invalid email', function(done) {
    request(server)
    .put('/users?token=' + testSession.token)
    .send({
      username: 'invalid'
    })
    .expect(412)
    .end(done);
  });
  it('cannot update user with invalid token', function(done) {
    request(server)
    .post('/users?token=invalid')
    .send({
      password: 'updated'
    })
    .expect(404)
    .end(done);
  });
});

describe('recipe routes', function() {
  // CREATE
  it('can create recipe', function(done) {
    request(server)
    .post('/recipes?token=' + testSession.token)
    .send({
      title: 'testing1',
      instructions: 'testing2',
      description: 'testing3',
      ingredients: 'testing4',
      notes: 'testing5',
    })
    .expect(200)
    .end(function(err, response) {
      expect(response.body._id).to.be.an('string');
      
      Recipe.findById(response.body._id).exec(function(err, recipe) {
        expect(recipe.title).to.equal('testing1');
        expect(recipe.instructions).to.equal('testing2');
        expect(recipe.description).to.equal('testing3');
        expect(recipe.ingredients).to.equal('testing4');
        expect(recipe.notes).to.equal('testing5');
        done();
      });
    });
  });
  it('cannot create recipe with invalid token', function(done) {
    request(server)
    .post('/recipes?token=invalid')
    .send({
      title: 'testing1',
      instructions: 'testing2',
      description: 'testing3',
      ingredients: 'testing4',
      notes: 'testing5',
    })
    .expect(401)
    .end(done);
  });
  
  // GETALL
  it('can get recipe list', function(done) {
    request(server)
    .get('/recipes?token=' + testSession.token)
    .expect(200)
    .end(function(err, response) {
      expect(response.body).to.be.an('array');
      done();
    });
  });
  it('cannot get recipe list with invalid token', function(done) {
    request(server)
    .get('/recipes?token=invalid')
    .expect(401)
    .end(done);
  });
  
  // GET
  it('can get recipe by id', function(done) {
    request(server)
    .get('/recipes/' + testRecipe._id +'?token=' + testSession.token)
    .expect(200)
    .end(function(err, response) {
      expect(response.body.title).to.equal('testing1');
      expect(response.body.instructions).to.equal('testing2');
      expect(response.body.description).to.equal('testing3');
      expect(response.body.ingredients).to.equal('testing4');
      expect(response.body.notes).to.equal('testing5');
      done();
    });
  });
  it('cannot get recipe by id with invalid token', function(done) {
    request(server)
    .get('/recipes/' + testRecipe._id + '?token=invalid')
    .expect(401)
    .end(done);
  });
  it('cannot get recipe with invalid id', function(done) {
    request(server)
    .get('/recipes/5af3a544aed15706b95237d1?token=' + testSession.token)
    .expect(404)
    .end(done);
  });
  
  // PUT
  it('can update recipe by id', function(done) {
    request(server)
    .put('/recipes/' + testRecipe._id +'?token=' + testSession.token)
    .send({
      title: 'updated1',
      instructions: 'updated2',
      description: 'updated3',
      ingredients: 'updated4',
      notes: 'updated5',
    })
    .expect(200)
    .end(function(err, response) {
      expect(response.body._id).to.equal(testRecipe._id.toString());
      
      Recipe.findById(testRecipe._id).exec(function(err, recipe) {
        expect(recipe.title).to.equal('updated1');
        expect(recipe.instructions).to.equal('updated2');
        expect(recipe.description).to.equal('updated3');
        expect(recipe.ingredients).to.equal('updated4');
        expect(recipe.notes).to.equal('updated5');
        done();
      });
    });
  });
  it('cannot update recipe by id with invalid token', function(done) {
    request(server)
    .put('/recipes/' + testRecipe._id + '?token=invalid')
    .expect(401)
    .end(done);
  });
  it('cannot update recipe with invalid id', function(done) {
    request(server)
    .put('/recipes/5af3a544aed15706b95237d1?token=' + testSession.token)
    .expect(404)
    .end(done);
  });
})

after(done => {
  server.close(done);
});
