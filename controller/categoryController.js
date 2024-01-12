const {hashPassword, comparePassword} = require("../auth/auth");
const comman = require("../auth/comman");
const {users, categories} = require("../models")
const jwt = require("jsonwebtoken")
const create = async (req, res) => {
    try{
        const {categoryName } = req.body;
        const userId = req.params.userId
        const existUser = await users.findOne({where : {id:userId}});
        if(existUser){
            const categoryData = await categories.create({categoryName, createdBy : userId })
            res.status(200).json({data:categoryData})
        }else{
            res.status(401).json({message : "user does not exist"})
        }
        
    }catch(err){
        res.status(500).json({error : err})
    }
}
const getCategory = async (req, res) => {
    try{
        const userId  = req.params.userId;
        const existUser = await users.findOne({where : {id:userId}});
        if(existUser){
            const categoryData = await categories.findAll({where:{createdBy : userId }});
            res.status(200).json({data:categoryData})
        }else{
            res.status(401).json({message : "user does not exist"})
        }   
    }catch(err){
        res.status(500).json({error : err})
    }
}
const deleteCategory = async (req, res) => {
    try{
        const categoryId = req.params.categoryId;
        const userId = req.params.userId;
        console.log(userId,categoryId)
        const existUser = await users.findOne({where : {id:userId}});
        if(existUser){
            const category = await categories.findByPk(categoryId)
            //user own and admin all   category can delete
            if(category && category.createdBy == userId || existUser.userRole == 2){
                await category.destroy();
                res.status(204).send("delete category");
            }else{
                res.status(401).json({message : "something wrong"})
            }
        }else{
            res.status(401).json({message : "user does not exist"})
        }   
    }catch(err){
        res.status(500).json({error : err})
    }
}
module.exports = {create, getCategory, deleteCategory}