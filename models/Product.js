const mongoose = require('mongoose');
const {Schema} = mongoose;

const autoIncrementModelID = require('./Counter');

//esquema de usuarios
const productSchema = new Schema({
    id: { type: Number, unique: true, min: 1 },
    socialsec:{type:String, required:true},
    name: {type:String, required:true},
    surname: {type:String, required:true},
    fullname: {type:String, required:true},
    salary: {type:String, required:true},
    date: {type:String,  required:true}
});

productSchema.pre('save', function (next) {
    if (!this.isNew) {
      next();
      return;
    }
  
    autoIncrementModelID('activities', this, next);
  });

module.exports = mongoose.model('products',productSchema);