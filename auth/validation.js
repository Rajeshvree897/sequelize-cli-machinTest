const {users} = require("../models")
const signup = async (req, res, next) => {
    const {firstName, lastName, email, userRole,password,gender } = req.body;
    if(!firstName || !lastName || !email || !userRole || !password|| !gender){
        res.status(201).json({message : "All field required"})
    }
    const existUser = await users.findOne({where:{email:email}});
    if(existUser){
        res.status(201).json({message : "User already exist."})
    }
    next();
}

const login = async (req, res, next) => {
    const {email,password } = req.body;
    if( !email  || !password){
        res.status(201).json({message : "Email & pasword required."})
    }
    next();
}
module.exports = {signup, login}
