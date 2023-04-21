const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





const Login = async(req,res)=>{
    try{
        const userMatch = await users.findOne({email:req.body.email});
        if(userMatch){
            const passMatch = await bcrypt.compare(req.body.password,userMatch.password);
            if(passMatch){
                if(userMatch.isAdmin === true){
                    const token = jwt.sign({
                        id:userMatch._id,
                        name:userMatch.name,
                        email:userMatch.email,
                    }, 'MYSECRETKEYfORADMIN',{expiresIn:"1h"});
                    res.status(200).send({adToken:token,statusCode:200});
                }else{
                    res.status(200).send({message:"user not an admin",statusCode:403});
                }
            }else{
                res.status(200).send({message:"Invalid username or password",statusCode:403});
            }
        }else{
            res.status(200).send({message:"user not found",statusCode:403});
        }
    }catch(error){
        console.log(error.message,"Error in login");
    }
}


const Dashboard = async(req, res)=>{
    try{
        const decoded = jwt.verify(req.headers.token,'MYSECRETKEYfORADMIN');
        const userMatch = await users.findOne({_id:decoded.id});
        if(userMatch){
            res.status(200).send({message:"Authorized Access!",code:200,user:userMatch});
        }else{
            res.status(200).send({message:"UnAuthorized Access!",code:403,user:null});
        }
    }catch(error){
        console.log(error.message,"error in dashboard");
    }
}



const ScheduleQuiz = async(req,res)=>{
    try{
        const decoded = jwt.verify(req.headers.token,'MYSECRETKEYfORADMIN');
        const userMatch = await users.findOne({_id:decoded.id});
        if(userMatch){
            res.status(200).send({message:"Authorized Access!",code:200,user:userMatch});
        }else{
            res.status(200).send({message:"UnAuthorized Access!",code:403,user:null});
        }
    }catch(error){
        console.log(error.message,"error in schedule");
    }
}


module.exports = {
    Login,
    Dashboard,
    ScheduleQuiz,
}