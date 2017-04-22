module.exports = function(app, passport, User, LocalStrategy, bcrypt){

  passport.serializeUser(function(user, done) {
  done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  app.post('/login', passport.authenticate('localLogin', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

  app.post("/signup", passport.authenticate('localSignup', { successRedirect: '/', failureRedirect: '/signup', failureFlash: true }));

  passport.use("localLogin", new LocalStrategy(
    {  usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, username, password, done) {
    console.log(username);
    console.log(password);
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      console.log(user);
      if (!user) {
        return done(null, false, { message: 'Incorrect username and password.' });
      }
      bcrypt.compare(password, user.password, function(err, res) {
        console.log("The result is "+ res);
        if(res !== true){
          return done(null, false, { message: 'Incorrect username and password.' });
        }else{
          return done(null, user);
        }
    });

    });
  }
));

  passport.use("localSignup", new LocalStrategy(
    {  usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
    function(req, username, password, done) {
      User.findOne({username : username }, function(err, user){
        if(err) { throw err }
        if(user){
          return done(null, false, { message: 'User already exists' });
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
          var guest = new User({
            username : req.body.username,
            password : hash,
            email : username
          });

          guest.save(function(err, user){
            if(err)
              throw err;
            return done(null, user);
          });

      });
    }
  ))

};
