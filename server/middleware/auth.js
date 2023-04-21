const jwt = require('jsonwebtoken');

const users = require('../models/userModel');

const auth =async (req,res,next)=>{
    try {
        if (req.headers.token === undefined) {
            res.status(200).send({ message: "token not found!", code:403 });
        }else if(req.headers.token){
            const decodedToken = jwt.verify(req.headers.token, 'MYSECRETKEY');
            if (!decodedToken) {
                res.status(200).send({ message: "Unauthorized Access!", code:403 });
            }else{
                next();
            }
        }else{
            next();
        }
    } catch (error) {
        res.status(200).send({ message: "Unauthorized Access!", code: 403 });
    }
}


module.exports= {
    auth,
}