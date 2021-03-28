const mongoose = require('mongoose');


const UsersSchema = mongoose.Schema({
    name: { type: String, required:true,min: 6,max:255},
    email: { type: String,required:true},
    password: { type: String, required:true,min: 8,max:64},
    phone: {type:String, required:true},
    date_added:{type: Date, default:Date.now},
    address: {type: String, required:true},
    userType: {type :Number, required:true},
    img_src: {type: String ,required:true}
});

module.exports = mongoose.model('users',UsersSchema);