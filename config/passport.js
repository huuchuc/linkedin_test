var LocalStrategy = require('passport-local').Strategy;
var tool          = require('./tool');
var models        = require('../app/models/index');

module.exports = function(passport) {

    // Create session passport
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    // Put user detail to session
    passport.deserializeUser(function(id, done) {
      models.user.find({
        attributes: ['uname'],
        where: {
          id: id
        }
      })
      .then(function(user) {
        console.log('/login: '+ user);
        done(null, user);
      })
      .catch(function(err){
        done(err, null);
      });
    });

    // LOGIN
    passport.use('login', new LocalStrategy({
          // set field for auth
          usernameField: 'uname',
          passwordField: 'password',
          passReqToCallback: true // allow route call and check login
        }, function(req, username, password, done) {
          // Asynchonus 
          process.nextTick(function() {

            var hashPwd = tool.generateHash(password);

            console.log(username+","+password);

            //find user by uname
            models.user.find({
              where: {
                uname   : username
              }
            }).then(function(user) {
                console.log("/login: "+user);

                if(user && tool.validPassword(password, user.password)){
                  return done(null, user);
                }
                return done(null, false);
              
            }).catch(function(err){
                console.log(err);
                return done(err);
            });
          });
    }));

    // SIGNUP
    passport.use('signup', new LocalStrategy({
        // set field for auth
        usernameField: 'uname',
        passwordField: 'password',
        passReqToCallback: true // allow route call and check login
      },function(req, username, password, done) {

        process.nextTick(function() {

          console.log(username+","+password);
          console.log(models.user);

            //find user by uname
            models.user.find({
              where: {
                uname: username
              }
            })
            .then(function(user) {
              console.log("/signup: "+user);
              return done(null, false, { message: 'username existed' });
            })
            .catch(function(err){
              return done(err);
            });

            var hashPwd = tool.generateHash(password);
            models.user.create({
              uname : username,
              password: hashPwd
            })
            .then(function(user) {
              return done(null, result, { message: 'Created successful' })
            })
            .catch(function(err){
              return done(err);
            });

          });
      }));

  }