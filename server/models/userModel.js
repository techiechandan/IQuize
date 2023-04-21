const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        isRequired: true,
    },
    email:{
        type: String,
        isRequired: true,
    },
    password:{
        type: String,
        isRequired: true,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    }
});

module.exports = mongoose.model('User',userSchema);
