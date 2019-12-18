'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  //_id:mongoose.Schema.Types.ObjectId,
  userId: {
    type: String,
    index: true,
    required:true,
    unique: true
  },
  firstName: {
    type: String,
    required:true,
    default: ''
  },
  lastName: {
    type: String,
    required:true,
    default: ''
  },
  email: {
    type: String,
    required:true,
    default: ''
  },
  password: {
    type: String,
    required:true,
    default: 'passskdajakdjkadsj'
  },
  resetPasswordToken:{
    type:String,
    default:'token'
  },
  countryCode:{
    type: String,  
    required:true,
    default:'+91'
  },
  mobileNumber: {
    type: Number,
    required:true,
    min:1000000000,
    max:9999999999
  }

},
{
  timestamps: true
});


mongoose.model('User', userSchema);