'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//const User = mongoose.model('User');

let expenseSchema = new Schema({
  //  _id:mongoose.Schema.Types.ObjectId,
    expenseId: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId, ref:'Group',
        required: true,
    },
    expenseDescription: {
        type: String,
        required: true,
        default: ''
    },
    expenseAmount: {
        type: Number,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    paidBy: [{
        user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
        amountLent: Number
    }
    ],
    usersInvolved: [{
        user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
        amountSpent: Number
    }
    ]
},
    {
        timestamps: true
    });


mongoose.model('Expense', expenseSchema);