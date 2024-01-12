const bcrypt = require("bcryptjs");
const {users} = require("../models");
const jwt = require("jsonwebtoken")
const hashPassword = async(password) => {
    console.log(password)
    const salt =  await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    return hashPass
}
const comparePassword = async(email, password) => {
    const hashedPassword = await users.findOne({where : {email}, attributes : ['password']})
    const isValidate = await  bcrypt.compare(password, hashedPassword.password);
    return isValidate;
}
const authorized = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer') || !req.params.userId) {
        return res.status(401).json({ error: 'Invalid or missing Authorization header' });
    }
    const token = authHeader.split('Bearer')[1].trim();
    try {
        const isVerify = jwt.verify(token, "ABSCDEF-SCREATE-KEY");
        console.log(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token verification failed' });
    }  
    next(); 
}
module.exports = {hashPassword, comparePassword, authorized}