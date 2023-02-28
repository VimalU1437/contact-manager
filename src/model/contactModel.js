const mongoose = require("mongoose");


const contactSchema = mongoose.Schema({
    firstName: {type:String , required:true},
    lastName: {type:String , required:true},
    email: {type:String , required:true , unique:true},
    phone: {type:String , required:true , unique:true},
})

const contactModel = mongoose.model("contacts",contactSchema);

module.exports = contactModel;