const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authentication = async (req,res,next) => {
  try {
      const token = req.header('Authorization');
      if(!token){
          return res.status(401).json({message:'Authorization Token Missing',success:false})
      }
  
        const user = jwt.verify(token,process.env.JSW_WEB_TOKEN_SECRETKEY);
        const data = await User.findById(user.userId);
        req.user=data;
        next();
  } catch (error) {
        console.log(error);
        return res.status(500).json({success:false})
  }

};


const isAdmin = async(req,res,next) => {
    try {
        if(req.user.role!=='admin'){
            return res.status(404).json({message:'Admin role required'})
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false})
    }
}


module.exports={authentication,isAdmin};
