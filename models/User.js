const mongoose = require('mongoose');
const {Schema} = mongoose;

//esquema de usuarios
const userSchema = new Schema({
    fullname:{type:String, unique:true, required:true},
    name:{type:String, required:true},
    surname:{type:String, required:true},
    pass:{type:String, require:true},
    email: {type:String, required:true},
    address: {type:String, required:true},
    birth: {type:String, required:true},
    admin:{type:Number, required:true}
});

module.exports = mongoose.model('users',userSchema);