const express = require("express")
const app = express();
const mongoose = require("../model/databases")
const jwt = require("jsonwebtoken");
const { response } = require("express");
const { db } = require("../model/databases");
// get all data
const getDetails = async(req,res)=>{
    try{
        const details = await mongoose.find()
        res.json({msg:"Get all API",
            message:details})
   }
   catch(err){
        res.send(err)   
   }
}
// get by id
const getById = async(req,res)=>{
    try{
        const detail = await mongoose.findOne({userId: req.params.userId})
        res.json({msg:"Get by userId API",
                message:detail})
    }
    catch(error){
            res.json({
                message:"something error",
                message:error
            })
        }
}
const postDetails = async(req,res)=>{
    let {firstName, lastName, age, location, phoneNumber,email} = req.body
    try{
        if(!firstName || !lastName || !age || !location || !email){
            res.json({ message: "enter all data", status: false})
        }else{
            // for four digits random number 
            userId = "UID" + Math.trunc(Math.floor(100000)+Math.random()*90000)
            var myobj = await new mongoose({
                firstName,
                lastName,
                age,
                location,
                userId : userId,
                phoneNumber,
                email
            })
            const det = await myobj.save()
            if(myobj){
                res.json({message: "user saved succesfully", status: true})
            }else{
                res.json({message: "user not saved", status: false})
            }
        }      
    }catch(error){
         res.json({message: error.message, status: false})
    }
}
// patch by id
const patchById = async(req,res)=>{
    try{
        const id = req.params.userId;
        // console.log(id)
        const updatedata = req.body;
        const option = {new:true};
        const details = await mongoose.findOneAndUpdate({userId: id}, 
            updatedata, {new:true})
        res.json({
            message:"updated successfuly by userId API",
            details:details
        })
    }
    catch(err){
            res.send(err)
    }
}

const deleteById = async(req,res)=>{
    await mongoose.findOneAndDelete({userId:req.params.userId})
    .then(result=>{
        res.status(200).json({
            message:(`Document with ${result.firstName} has been deleted..`),
            deletedData:result
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:error
        })
    })
}
const postBydata = async(req,res)=>{
    try{
        userId = "UID" + Math.trunc(Math.floor(100000)+Math.random()*90000)
        let {firstName, lastName, age, location, phoneNumber} = req.body
        var obj = await new mongoose({
            firstName,
            lastName,
            age,
            location,
            userId : userId,
            phoneNumber
        })
        const det = await obj.save()
        console.log(det);
        const token = jwt.sign({phoneNumber:obj.phoneNumber},"oiuytrertyui",{expiresIn:'8h'});
        res.header('auth-token',token).send(token)   
    }catch(err){
        res.send(err) 
    }
}

// const emailSend = async(req,res)=>{
//     try{
//     const data = await mongoose.findOne({
//         email:req.params.email
//     });
//     if(data){

//     }
// }
// catch{

// }
// }

module.exports = {getDetails,
                postDetails,
                getById,
                patchById,
                deleteById,
                postBydata,
                }

 