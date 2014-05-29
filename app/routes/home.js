'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Node.js: Home'});
};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Node.js: Help'});
};

exports.about = (req, res)=>{
  res.render('home/about', {title: 'About Richmond'});
};

exports.resume = (req, res)=>{
  res.render('home/resume', {title: 'Resume'});
};

exports.faq = (req, res)=>{
  res.render('home/faq', {title: 'FAQ'});
};
