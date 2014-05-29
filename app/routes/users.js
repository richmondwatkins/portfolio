'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.login = (req, res)=>{
  res.render('users/login', {title: 'Login'});
};


exports.authenticate = (req, res)=>{
  User.login(req.body, user=>{
    if(user){
      req.session.userId = user._id;
      res.redirect('/portfolios');
    }else {
      req.session.userId = null;
      res.redirect('/login');
    }

  });
  // res.render('users/login', {title: 'Login'});
};

exports.lookup = (req, res, next)=>{
  User.findByUserId(req.session.userId, user=>{
    res.locals.user = user;
    console.log('user user user');
    console.log(res.locals.user);
    next();
  });
};

exports.logout = (req, res)=>{
  req.session.userId = null;
  res.render('users/login', {title: 'Login'});
};
