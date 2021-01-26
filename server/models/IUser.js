const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name : {type : String , required : true},
  gender : {type : String , required : true},
  email : {type : String , required : true , unique : true},
  phone : {type : String , required : true},
  created : {type : Date , default : Date.now()},
});
let User = mongoose.model('user' , userSchema);
module.exports = User;
