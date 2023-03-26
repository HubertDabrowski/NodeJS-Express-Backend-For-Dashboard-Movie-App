const express = require("express");
const User = require('../models/auth');
const verifyJWT = require('../middleware')

const router = express.Router();

//put
router.put("/:id",verifyJWT, async (req, res) => {
  if(req.user.id === req.params.id){
    // if(req.body.password){
    //   const salt = bcrypt.genSalt(10);
    //   req.body.password = bcrypt.hash(req.body.password, salt);
    // }

    try{
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},  // set ustawi od nowa cale body
        {new: true}        // zwroci updatowanego usera
      ); 

      res.status(200).json(updatedUser);
    } catch(err){
      res.json(500).json(err);
    }
  }else{
    res.status(403).json("Cannot update not your own acc!")
  }
});

//delete
router.delete("/:id",verifyJWT, async (req, res) => {
  if(req.user.id === req.params.id){
    try{
      const deleteUser = await User.findByIdAndDelete(req.params.id); 

      res.status(200).json(deleteUser);
    } catch (err){
      res.json(500).json(err);
    }
  }else{
    res.status(403).json("Cannot delete not your own acc!")
  }
});

//get
router.get("/concrete/:id",verifyJWT, async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    const {password, ...data} = user._doc   //żeby hasła nie wysyłać to rozdzielamy obiekt
    res.status(200).json(data);
  } catch (err){
    res.json(500).json(err);
  }
});

router.get("/all",verifyJWT, async (req, res) => {    //szukanie userow po imieniu
  const query = req.query.name;
  try{
    if(query){
      const usersArr = await User.find({
        name: query
      });

      usersArrNoPass = usersArr.map (user => {
        const {password, ...data} = user._doc;
        return data;
      })
      
      res.status(200).json(usersArrNoPass);
    }else{
      res.status(404).json("Users not found!");
    }
  }catch(err){
    res.status(500).json(err);
  }
    
});

module.exports = router;