const { Router } = require('express');
const {usermodel,purchasemodel,coursemodel} = require("../Models/db");
const {userMiddleware} = require('../middleware/user')
const jwt = require('jsonwebtoken');
 

const courseRouter = Router();

courseRouter.get("/Preview", [userMiddleware] ,async function(req,res){
 
    try{

    const userId = req.userId ;
    const courses = await coursemodel.find({})
    res.json({
        message :  "All available courses",
        courses
    })
   }catch(err){
     res.json({
         message :'Some error occured.!',
         err
      })
   }
});

courseRouter.post("/purchase",[userMiddleware],async function (req,res){
    const userId = req.userId;
    const courseId = req.headers.courseId;
    const { tittle, amount } = req.body;

try{
    const course = await coursemodel.findOne({
        tittle : tittle
    })

    if( amount == course.amount ){
        await purchasemodel.create({
            userId : userId ,
            courseId : courseId
        })

        res.json({
            message :  "You have succesfully bought the course"
        })
    }else{
        res.status(403).json({
            message : "Insuffiecient Amount"
        })
    }
}catch(err){
    res.status(500).json({
        message : "Some error occured",
        err
      })
}
})

courseRouter.get("/purchased",[userMiddleware],async function(req,res){
    userId = req.userId;
try{
    const purchase = await purchasemodel.find({
        userId
    });

    let purchasedCourseId = [];

    for (let i = 0; i < purchase.length; i++) {
         purchasedCourseId.push(purchase[i].courseId);
    }
    
    const courseData = await coursemodel.find({
         _id : {$in : purchasedCourseId}
    })

    res.json({
        purchase,
        courseData
    })
}catch(err){
    res.status(500).json({
      message : "Some error occured",
      err
    })
}

});



module.exports = courseRouter