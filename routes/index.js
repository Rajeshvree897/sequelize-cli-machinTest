const express =  require("express");
const router = express.Router();
const validation = require("../auth/validation");
const {authorized} = require("../auth/auth")
const userController = require("../controller/userController");
const categoryController = require("../controller/categoryController")
router.post("/signup",validation.signup, userController.create),
router.post("/login",validation.login, userController.login)
router.post("/category/:userId",authorized, categoryController.create)
router.get("/category/:userId",authorized, categoryController.getCategory)
router.delete("/category/:userId/:categoryId",authorized, categoryController.deleteCategory)



module.exports = router