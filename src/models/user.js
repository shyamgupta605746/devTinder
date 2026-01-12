const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");   
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter a valid Email');
            }
        }
    },
    password: {
        type: String,
        require: true,
        HashChangeEvent: true,
    },
    age: {
        type: Number,
        default: 0,
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male', "female", "others"].includes(value)){
                throw new Error("Gender data is valid");
            }
        },
    },
},
{
    timestamps: true,
}
);

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$080607", 
        {expiresIn: "7d",}
    ); 
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const HashPassword = user.password;
    const isPAsswordValid  = await bcrypt.compare(passwordInputByUser, HashPassword);
    return isPAsswordValid;
} 

module.exports = mongoose.model("User", userSchema);