var LocalStrategy = require('passport-local').Strategy;
var models        = require('../app/models/index');

module.exports = function(passport) {

    // PUT USER ID TO SESSION
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    // GET DETAIL USER & PUT TO SESSION
    passport.deserializeUser(function(id, done) {
      models.user.find({
        attributes: ['id','uname'],
        where: {
          id: id
        }
      }).then(function(user) {
        done(null, user);
      }).catch(function(err){
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
            //find user by uname
            models.user.find({
              where: {
                uname   : username
              }
            }).then(function(user) {
                if(user){
                  if(models.user.validPassword(password, user.password)){
                    return done(null, user);
                  }
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
            //find user by uname
            models.user.find({
              where: {
                uname: username
              }
            }).then(function(user) {
              if(user){
                  return done(null, false);
              }else{
                  var hashPwd = models.user.generateHash(password);
                  models.user.create({
                    uname : username,
                    password: hashPwd
                  }).then(function(result) {
                    return done(null, result);
                  }).catch(function(err){
                    return done(err);
                  });
              }
            }).catch(function(err){
              return done(err);
            });
          });
      }));

  }