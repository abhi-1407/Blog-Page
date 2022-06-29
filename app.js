//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const homeStartingContent = "According to a recent survey, blogs have ranked as the third most trustworthy source of information, following only friends and family. Thats right — bloggers are trusted more than celebrities, journalists, brands, and politicians."
const aboutContent = "This is a basic blogging website made using express, ejs,mongoDB and uses modules like lodash,etc. You can add, edit and delete your articles over here";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();
var _=require('lodash');
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/blogDB");
const post=new mongoose.Schema({
  title:String,
  post_body:String
})
const postobj=mongoose.model("posts",post);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/posts/:allposts', (req, res) => {
  
  const reqid=req.params.allposts;
  postobj.findOne({_id:reqid}, function(err, data){
    res.render("post", {
      p1: data.title,
      p2: data.post_body,
      val:data._id
    });
    
})
})
app.get('/',function(req,res){
  postobj.find({},function(err,data){
  res.render("home",{startingContent:homeStartingContent, p1:data}); 
  })
  
})
app.get('/about',function(req,res){
  res.render("about",{p1:aboutContent});
})
app.get('/contact',function(req,res){
  res.render("contact",{p1:contactContent});
})
app.get('/compose',function(req,res){
  res.render("compose");
  
})
app.post('/compose',function(req,res)
{
  const compose_obj=new postobj({
    title:req.body.title,
    post_body:req.body.postbody
  });
  compose_obj.save(function(err){
    if(!err)
    {
      res.redirect("/");
    }
  })
})
app.post('/post',function(req,res){
  const delid=req.body.delete;
  postobj.deleteOne({_id:delid},function(err,data){
  if(!err)
  res.redirect("/");
  })
})
app.listen(3000, function() {
  console.log("Server started on port 3000");
})
