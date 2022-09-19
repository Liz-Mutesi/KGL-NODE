const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");



const signupSchema = new mongoose.Schema({
    firstname: {
    type: String,
    trim:true,
    required: 'first name can not be empty',
  },
  surname: {
    type:String,
    trim:true,
    required: true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
  },
  // password:{
  //   type:String,
  //   required:true,
  //   trim:true,
  
  // },
  role:{
    type:String,
    required: true,
    enum: ['director', 'manager', 'sales_agent'],
    trim: true,
  
  },
  branch:{
    type:String,
    required: true,
    trim: true,
    enum: ['Jinja', 'Mubende', 'Head_office']
  
  }

});



signupSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("Signup", signupSchema);

