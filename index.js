const { default: mongoose } = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const { UserRouter } = require('./Routers/userRouter');
const { AdminRouter } = require('./Routers/AdminRouter');
const {courseRouter} = require('./Routers/course');

const app =  express();
app.use(express.json())

app.use("/Users", UserRouter);
app.use("/Admin", AdminRouter);
app.use("/Course",courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000,()=>{
        console.log("Server started at port : {3000}")
    })
        
}

main()