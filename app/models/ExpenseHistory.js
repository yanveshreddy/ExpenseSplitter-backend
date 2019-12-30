'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//const User = mongoose.model('User');

let expenseHistorySchema = new Schema({
    expenseId:{type:String,required:true},
    expenseName:{type:String,required:true},
    expenseAmount:{type:String},
    actionType: {type: String, require: true},
    actionDoneBy: { type: Schema.Types.ObjectId,ref:'User', required: true },
    message: { type: String, required: true },
},
{
    timestamps: true
});
mongoose.model('ExpenseHistory', expenseHistorySchema);
