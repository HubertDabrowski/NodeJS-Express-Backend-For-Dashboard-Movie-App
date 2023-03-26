const express = require("express");
const Movie = require('../models/movie');
const verifyJWT = require('../middleware');

const router = express.Router();

//post
router.post("/add",verifyJWT, async (req, res) => {
  if(req.user.isAdmin){
    const newMovie = new Movie(req.body);

    try{
      const movieToAdd = await newMovie.save();
      res.status(200).json(movieToAdd);
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(403).json("Only admin can add new movie!")
  }
});

//put
router.put("/:id",verifyJWT, async (req, res) => {
  if(req.user.isAdmin){
    try{
      const updateMovie = await Movie.findByIdAndUpdate(req.params.id,{
          $set: req.body
        },{
          new: true
        }
      );
      res.status(200).json(updateMovie);
    }catch(err){
      res.status(500).json(err);
    }
    
  }else{
    res.status(403).json("Only admin can add new movies!")
  }
});

//delete
router.delete("/:id",verifyJWT, async (req, res) => {
  if(req.user.isAdmin){
    try{
      await Movie.findByIdAndDelete(req.params.id)
      res.status(200).json("Deleted!");
    }catch(err){
      res.status(500).json(err);
    }
    
  }else{
    res.status(403).json("Only admin can add new movies!")
  }
});

//get one
router.get("/:id",verifyJWT, async (req, res) => {
  try{
      const movie = await Movie.findById(req.params.id)
      res.status(200).json(movie);
    }catch(err){
      res.status(500).json(err);
    }
});

//get more
router.get("/",verifyJWT, async (req, res) => {    //szukanie userow po imieniu
 const query = req.query.title;
  try{
    if(req.user.isAdmin){                                            //szuka żeby zawierało
      const movieArr = await Movie.find({
        title: {$regex: query}
      });
      // movieArr = usersArr.map (user => {
      //   const {password, ...data} = user._doc;
      //   return data;
      // })
      
      res.status(200).json(movieArr);
    }else{
      res.status(404).json("Movie not found!");
    }
  }catch(err){
    res.status(500).json(err);
  }
    
});

module.exports = router;