const mongoose = require('mongoose');
const validator = require('validator');

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
});

module.exports = mongoose.model("User", userSchema);