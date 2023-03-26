const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//verify jwt
const verifyJWT = (req,res,next) => {
  const tokenHead = req.headers.token;
  
  if(!tokenHead){
    return res.status(401).json('Authentication error!')
  }

  //const token = tokenHead.split(" ")[1]; //pobiera z nagłówka tylko token jwt i rozdziela jak 
  // sie poda nr bearer 12364782154064721-yhf9ed-9

  jwt.verify(tokenHead, process.env.JWT,(err, user) => {
    if(err){
      res.status(403).json("Token not valid!");
    } else{
      req.user = user;
      next()
    }
  })
};

module.exports = verifyJWT;