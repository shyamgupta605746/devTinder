const validator = require("validator");

const validatesingnUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

const validateEditprofileData = (req)=>{
    const allowedEditprofileData = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills", "password"];
    const isEditAllowed = Object.keys(req.body).every((field)=>
    allowedEditprofileData.includes(field)
    );
    return isEditAllowed;
}

module.exports = { validatesingnUpData, validateEditprofileData };
