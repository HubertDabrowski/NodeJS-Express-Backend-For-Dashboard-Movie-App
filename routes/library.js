const express = require("express");
const Library = require('../models/library');
const verifyJWT = require('../middleware');

const router = express.Router();

//post
router.post("/",verifyJWT, async (req, res) => {
  if(req.user.isAdmin){
    const newLib = new Library(req.body);

    try{
      const libToAdd = await newLib.save();
      res.status(200).json(libToAdd);
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(403).json("Only admin can add new movie!")
  }
});

//delete
router.delete("/:id",verifyJWT, async (req, res) => {
  if(req.user.isAdmin){
    try{
      const deletedLib = await Library.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted!");
    }catch(err){
      res.status(500).json(err);
    }
    
  }else{
    res.status(403).json("Only admin can add new movies!")
  }
});

//get
router.get('/',verifyJWT, async(req,res) => {
  const query = req.query.genre;
  
  try{
    const lib = await Library.find({genre: query})
    res.status(200).json(lib);   
  }catch(err){
    res.status(500).json(err);
  }
})

module.exports = router;