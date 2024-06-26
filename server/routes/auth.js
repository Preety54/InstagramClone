 const express = require("express");
const router = express.Router()
 const mongoose =require('mongoose')
 const User =mongoose.model("User")
 const bcrypt = require('bcryptjs')
 const jwt =require('jsonwebtoken')
 const {JWT_SECRET} = require('../keys')
 const requireLogin = require('../routes/middlware/requireLogin')



 router.get('/protected',requireLogin,(req, res)=>{
  res.send("hello user")
 })

router.post('/signup', (req,res) => {
  // console.log(req.body)
  const {name,email,password} = req.body
  if(!email || !password || !name) {
     return res.status(422).json({ error: "please add all the fields" })
  }
  //res.json({message:"succesfully posted"})

  User.findOne({email:email})
  .then((savedUser)=>{
    if(savedUser){
      return res.status(422).json({error:"User already exists with that email"})
    }

    const user= new User({
      email,
      password,
      name
    })
    bcrypt.hash(password,16)
    .then(hashedpassword=>{
      const user=new User({
        email,
        password:hashedpassword,
        name
      })
    user.save()
    .then(User=>{
      res.json({message:"saved succesfully"})
    })
    .catch(err=>{
      console.log(err)
    })
  })
  })

  .catch(err=>{
    console.log(err)
  })
})

router.post('/signin',(req,res)=>{
  const{email,password}=req.body
  if(!email || !password){
    return res.status(422).json({error:"please add email or password"})
  }
  User.findOne({email:email})
  .then(savedUser=>{
    if(!savedUser){
       return res.status(422).json({error:"Invalid email or password"})
    }
    bcrypt.compare(password,savedUser.password)
    .then(doMatch=>{
     if(doMatch){
      // res.json({message:"successfully signed in"})
      const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
      const {_id,name,email,followers,following}=savedUser
      res.json({token,user:{_id,name,email,followers,following}})

    }
    else{
      return res.status(422).json({error:"Invalid email or password"})
    }
    })
    .catch(err=>{
      console.log(err)
    })
  })
})

module.exports =router