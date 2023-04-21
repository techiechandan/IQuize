const jwt = require('jsonwebtoken');
const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;



const SecurePassword = async(password)=>{
    try{
        const newPassword = await bcrypt.hash(password,saltRounds);
        return newPassword;
    }catch(error){
        console.log(error.message);
    }
}




const Login = async (req, res) => {
    try{
        res.json({data:"Login"});
    }catch(error){
        console.log(error.message);
    }
}


const Register = async (req, res) => {
    try{
        res.json({data:"Register"});
    }catch(error){
        console.log(error.message);
    }
}


const Contact = async (req, res) => {
    try{
        const decodedToken = jwt.verify(req.headers.token, 'MYSECRETKEY');
        if(decodedToken){
            const userData = await users.findOne({_id:decodedToken.id});
            if(userData){
                res.send({message:"Contact",user:userData,code:200});
            }else{
                res.status(200).send({message:"Unauthorized access!",code:403});
            }
        }else{
            res.status(200).send({message:"Unauthorized access!",code:403});
        }
    }catch(error){
        if(error){
            res.status(200).send({message:"Unauthorized access!",code:403});
        }
        console.log(error.message,"Error in Contact Method");
    }
}




const SaveContact = async (req, res) => {
    try{
        console.log(req.body);
        res.status(200).send({message:"Thanks for contacting iQuiz, your message has been sent.",code:200});
    }catch(error){
        res.status(200).send({message:"Sorry, we are unable to send your message,Please try again",code:403});
        console.log(error.message);
    }
}




const RegisterUser = async (req, res) => {
    try{
        console.log(req.body);
        const encreptedPassword = await SecurePassword(req.body.password);
        const newUser = new users({
            name:req.body.name,
            email:req.body.email,
            password:encreptedPassword
        });
        const userStatus = await newUser.save();
        if(userStatus){
            res.status(200).send({message:"Registration Completed!"});
            console.log("registration completed");
        }else{
            res.status(404).send({message:"Registration Faild...Please try again later!"});
        }
    }catch(error){
        console.log(error.message);
    }
}





const LoginUser = async (req,res)=>{
    try{
        const user = await users.findOne({email: req.body.email});

        if(user){
            // checking for password!
            const passMatch = await bcrypt.compare(req.body.password,user.password);
            if(passMatch){
                const token = jwt.sign({
                    id:user._id,
                    name:user.name,
                    email:user.email,
                  }, 'MYSECRETKEY',{expiresIn:"1h"});
                res.status(200).send({message:"Login",statusCode:200,token:token});
            }else{
                res.status(200).send({message:"Invalid Email or Password!",statusCode:403});
            }
        }else{
            res.status(200).send({message:"Invalid Email or Password!",statusCode:403});
        }    
    }catch(error){
        console.log(error.message);
    }
}



const getQuiz = (req,res) => {
    try{
        res.status(200).send({message:"Authenticated from Quiz"});
    }catch(error){
        console.log(error.message);
    }
}


const RenderQuiz = (req,res)=>{
    try{
        const QuizId = req.body.quizId;
        console.log(QuizId);

    }catch(error){
        console.log(error.message);
    }
}



module.exports = {
    Login,
    Register,
    Contact,
    SaveContact,
    RegisterUser,
    LoginUser,
    getQuiz,
    RenderQuiz,
}