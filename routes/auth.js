const express = require('express');
const User = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

//rejstracja
router.post("/register", async (req,res) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      name: req.body.name,
      password: hash,
      email: req.body.email
    });

    const user = await newUser.save();
    res.status(200).json(user);
  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
})

//login
router.post("/login", async (req,res) => {
  try{
    const loggedUser = await User.findOne({
      email: req.body.email
    })

    if(!loggedUser){
      res.status(401).json("Provide correct password or email!");
      return;
    }
    const isValid = await bcrypt.compare(req.body.password, loggedUser.password)
    if(!isValid){
      res.status(401).json("Provide correct password or email!");
      return;
    }

    const token = jwt.sign({
      id: loggedUser._id,
      isAdmin: loggedUser.isAdmin
    },
    process.env.JWT,
    {expiresIn: "1D"}
    );

    const {password, ...data} = loggedUser._doc //usuwa haslo z zwracanej wartosci
    res.status(200).json( {...data, token} );
    
  }catch(err){
    res.status(500).json(err);
  }
})

module.exports = router;