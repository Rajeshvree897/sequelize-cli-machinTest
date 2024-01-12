const {hashPassword, comparePassword} = require("../auth/auth");
const comman = require("../auth/comman");
const {users} = require("../models")
const jwt = require("jsonwebtoken")
const create = async (req, res) => {
    try{
        const {firstName, lastName, email, userRole,password,gender, hobbies,profilePic } = req.body;
        console.log("bgbgb", req.body)
        const hashpassword = await  hashPassword(password);
        const roleId = await comman.getRoleId(userRole);
        const getGender = gender.toLowerCase() == "female" ? "F" : "M";
        const userData = await users.create({firstName, lastName, email, userRole:roleId, gender:getGender, password : hashpassword,hobbies, profilePic})
        res.status(200).json({data:userData})
    }catch(err){
        res.status(500).json({error : err})
    }
}
const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log(req.body)
        const comparepass = await comparePassword(email, password);
        if(comparepass){
            const loginData = await users.findOne({where:{email}});
            if(loginData){
                const token = jwt.sign({id : loginData.id , email: loginData.email}, "ABSCDEF-SCREATE-KEY", {
                    expiresIn : "1h"
                })
                res.status(200).json({data:loginData, token:token})
            }else{
                res.status(401).json({message : "Wrong credentials"})
            }
        }else{
        res.status(401).json({message : "Wrong credentials"})
        }
    }catch(err){
        res.status(500).json({error : err})
    }
}
module.exports = {create, login}