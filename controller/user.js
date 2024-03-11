const User = require('../models/user');
const bcrypt = require('bcrypt');
const userServices = require('../services/userservices')


const registeredUser=async (req,res,next)=>{
    const {name,email,password,phonenumber,role} = req.body;

    try {
        const user = await User.findOne({email});
        if(user){
            return res.status(500).json({message:'User Already Exists'})
        }

        const saltround = 10;
        bcrypt.hash(password,saltround,async(err,hash)=>{
            if(err) console.log(err);
       
            await User.create({
                name,email,password:hash,phonenumber,role
            });
            res.status(201).json({message:'Successfully created'});
        })

    } catch (error) {
        res.status(500).json({error});
        console.log(JSON.stringify(error));
    }
};



const loginUser = async (req,res,next)=>{
    const {email,password} = req.body; 
    try {
        const loginUser=await User.findOne({email});
        if(loginUser){
           bcrypt.compare(password,loginUser.password,async(err,result)=>{
                if(err) console.log(err);

                if(result){
                    res.status(202).json({message:'Successfully user Login',token:userServices.generateAccessToken(loginUser._id,loginUser.name,loginUser.role)})
                }
                else{
                    res.status(400).json({success:false,message:"Check password incorrect"})
                }
           });

        }

        if(loginUser==null){
            res.status(404).json({success:false,message:"Users Not Found"})
        }
    } catch (error) {
        res.status(500).json({error});
        console.log(JSON.stringify(error));
    }   
}

module.exports={registeredUser,loginUser};