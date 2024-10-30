const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Userschema = new Schema({
    email : { type : String , unique : true},
    firstname : String , 
    lastname : String,
    hashpwd : {type : String , require : true}
})

const Adminschena = new Schema({
    email : { type : String , unique : true},
    firstname : String , 
    lastname : String,
    hashpwd : {type : String , require : true}
})

const courseschema = new Schema({
    tittle : String,
    description : String,
    Price  : Number ,
    imageurl : String,
    CreatorId : ObjectId
});

const purchaseschema = new Schema({
    userId : ObjectId,
    courseId : ObjectId 
});

const usermodel = mongoose.model("user",Userschema);
const adminmodel = mongoose.model('admin',Adminschena);
const coursemodel = mongoose.model("course",courseschema);
const purchasemodel = mongoose.model("purchase",purchaseschema);

module.exports = {
    usermodel,
    adminmodel,
    coursemodel,
    purchasemodel
}
 