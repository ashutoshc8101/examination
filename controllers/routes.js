module.exports = function(app){

  var auth = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
    }else{
      res.redirect('/login');
    }

  }

  app.get("/", auth, function(req,res){
    res.render("home");
  });

  app.get("/signup", function(req,res){
    res.render("signup");
  });

  app.get("/login", function(req,res){
    res.render("login");
  });

  app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
  });

};
