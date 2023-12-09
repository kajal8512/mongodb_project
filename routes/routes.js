const express = require("express")
const router = express.Router();
// const database = require("../model/databases")
const app = express();
// const jwt = require("jsonwebtoken")
const {getDetails,postDetails,getById,patchById,deleteById,postBydata} = require("../controller/method")
router.get('/get/All/users',getDetails)
// get by id
router.get('/getOne/:userId',getById)
router.post('/post/userData',postDetails)
// patch data by id
router.patch('/update/data/:userId',patchById)
// delete data by id
router.delete("/delete/data/:userId",deleteById)
const {auth} = require("../controller/auth")
router.post("/post",postBydata)
router.get('/post',auth)
module.exports = router