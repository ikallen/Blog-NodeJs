var express = require('express');
var router = express.Router();
var User = require('../models/user');

var crypto = require('crypto');

//var User = require

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get("/reg",function(req,res) {
  res.render("reg",{
    title : "用户注册"
  });
});

router.post('/reg',function(req,res){
	/*
	 console.log(req.body['password']);
  	console.log(req.body['password-repeat']);
  	*/
  
  if(req.body['password-repeat'] != req.body['password']){
    req.flash('error', '两次输入的密码不一致');
    return res.redirect('/reg');
  } 

  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name:req.body.username,
    password:password
  });

  User.get(newUser.name,function(err,user){
    if(user){
      err='用户名已经存在';
    }

    if(err){
      req.flash('error',err);
      return res.redirect('/reg');
    }

    // 如果不存在就添加用户
    newUser.save(function(err){
      if(err){
        req.flash('error',err);
        return res.redirect('/reg');
      }

      req.session.user = newUser;
      req.flash('success','注册成功');
      res.redirect('/');

    });
  });

});

module.exports = router;



















