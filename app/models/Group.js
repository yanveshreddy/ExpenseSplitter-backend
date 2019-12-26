'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let groupSchema = new Schema({
  // _id:mongoose.Schema.Types.ObjectId,
  groupId: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  groupName: {
    type: String,
    required: true,
    default: ''
  },
  groupDescription:{
    type: String,
    required: true,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, ref:'User'
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }]
},
  {
    timestamps: true
  });


mongoose.model('Group', groupSchema);