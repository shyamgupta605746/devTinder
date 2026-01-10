const mongoose = require('mongoose');


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
    },
    password: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
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