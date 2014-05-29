'use strict';

// var traceur = require('traceur');
// var User = traceur.require(__dirname + '/../models/user.js');

var multiparty = require('multiparty');
var fs = require('fs');
var portfolios = global.nss.db.collection('portfolios');

exports.index = (req, res)=>{
  // res.render('portfolios/index');
  portfolios.find().toArray((e, p)=>{
      res.render('portfolios/index', {portfolios: p});
  });

};




exports.new = (req, res)=>{
    res.render('portfolios/new', {title: 'New Portfolio'});
};





exports.create = (req,res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files)=>{
    var portfolio = {};
    portfolio.title = fields.title[0];
    portfolio.date = fields.date[0];
    portfolio.description = fields.description[0];
    portfolio.git = fields.git[0];
    portfolio.app = fields.app[0];
    portfolio.photos = [];
    portfolio.userId = req.session.userId;
    console.log(fields);
    console.log(files);

    console.log('usre XXXXXXXXXXid');
    console.log('req.session.userId');
    files.photo.forEach(p=>{
      if(fs.existsSync(`${__dirname}/../static/img/${fields.title[0]}`)){
        fs.renameSync(p.path, `${__dirname}/../static/img/${fields.title[0]}/${p.originalFilename}`);
      }
      else{
        fs.mkdirSync(`${__dirname}/../static/img/${fields.title[0]}`);
        fs.renameSync(p.path, `${__dirname}/../static/img/${fields.title[0]}/${p.originalFilename}`);
      }

        portfolio.photos.push(p.originalFilename);
        console.log(portfolio);
    });
      portfolios.save(portfolio, ()=>res.redirect('/portfolios'));

          console.log('xxxxxxxxxx');
          console.log(files);
          console.log(fields);

    });

};
