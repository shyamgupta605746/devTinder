const auth = (req, res, next)=>{
    const token = "xyz";
    const isAdminToken = token === "xyz";
    if(isAdminToken){
        next();
    }else{
        res.status(401).send("unauthorised request, acess denied");
    }
}

const userAuth = (req, res, next)=>{
     const userToken = "myuser";
    const userloginToken = userToken === "myus.er";
    if(userloginToken){
    next();
    }else{
        res.status(401).send("unauthorized request");
    }
}

module.exports = { auth, userAuth };
