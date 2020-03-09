const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require('multer');
const Post = require("../models/Posts");
const Public = require('../models/Public')
const User = require('../models/Users')
const path = require('path')
const fs  = require('fs')
// $route  GET api/public/test
// @desc   返回的请求的json数据
// @access public
router.get("/test",(req,res) => {
  res.json({msg:"public works"})
})
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.resolve('./', 'public', 'img'));    
  },
  filename: function (req, file, cb) {
      cb(null,  file.originalname);  
  }
});

// $route  POST api/posts
// @desc   创建一个用户发布接口
// @access Private
router.post("/", multer({ storage: storage }).array('images') ,passport.authenticate('jwt', { session: false }),(req,res) => {  
      let newPost = {}
   newPost.user = req.user.id
   if(req.body.text) newPost.text = req.body.text
   new Public(newPost).save().then(profile => res.json(profile));
})


// $route  GET api/posts
// @desc   获取用户发布信息
// @access public
router.get("/",(req,res) => {
    Public.find()
  .populate('user', ["name", "avatar"])
      .sort({date: -1})
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({nopostsfound:"找不到任何评论信息"}))
})


// $route POST/api/posts
// @desc 上传图片接口
// @access private 
router.post('/file', multer({ storage: storage }).array('images') , passport.authenticate('jwt', { session: false }), (req,res)=>{
  const {renderId} = req.body
  if(renderId){
    Public.find({_id : renderId}).then((post)=>{
       var str = "http://localhost:5000/static/"
       if(req.body.imgarr) {
         JSON.parse(req.body.imgarr).forEach((item)=>{
             str += item
             post[0].img.push(str)
             str =  "http://localhost:5000/static/"
          let set = new Set( post[0].img)
          post[0].img = Array.from(set)
          })
       } 
       Public.findOneAndUpdate({_id : renderId }, { $set: post[0] }, { new: true }).then(profile => res.json(profile));
     })
  }
  else {
    var newPost = {}
    newPost.img = []
    newPost.user = req.user.id
    var str = "http://localhost:5000/static/"
    if(req.body.imgarr) {
      JSON.parse(req.body.imgarr).forEach((item)=>{
          str += item
          newPost.img.push(str)
          str =  "http://localhost:5000/static/"
       let set = new Set( newPost.img)
       newPost.img = Array.from(set)
       })
    } 
    new Public(newPost).save().then(profile => res.json(profile));
  }
})






module.exports = router;