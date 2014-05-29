'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var portfolios = traceur.require(__dirname + '/../routes/portfolios.js');

  app.all('*', dbg, users.lookup);
  app.get('/', dbg, home.index);
  app.get('/about', dbg, home.about);
  app.get('/faq', dbg, home.faq);
  app.get('/resume', dbg, home.resume);
  app.get('/login', dbg, users.login);
  app.post('/login', dbg, users.authenticate);
  app.get('/portfolios', dbg, portfolios.index);
  app.get('/logout', dbg, users.logout);
  app.get('/portfolio/new', dbg, portfolios.new);
  app.post('/portfolios', dbg, portfolios.create);

  console.log('Routes Loaded');
  fn();
}
