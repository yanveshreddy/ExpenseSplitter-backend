const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');

const check = require('../libs/checkLib');
const nodemailer = require('nodemailer');

const ExpenseModel = mongoose.model('Expense');


/*Controller Functions */

// start getSingleExpenseDetails function 

let getSingleExpenseDetails = (req, res) => {

    ExpenseModel.findOne({ 'expenseId': req.params.expenseId })
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if (err) {
            logger.error(err.message, 'expense Controller: getSingleExpenseDetails', 10)
            let apiResponse = response.generate(true, "Failed to find expense Details", 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No expense Found', 'expense Controller: getSingleExpenseDetails')
            let apiResponse = response.generate(true, "No expense found", 404, null);
            res.send(apiResponse);
        }
        else {
            let apiResponse = response.generate(false, "expense Details Found", 200, result);
            res.send(apiResponse);
        }
    })
}

//end getSingleExpenseDetails function

/****************************************************************************************************/

// start create expense function 

let createExpense = (req, res) => {

    const expenseId = shortid.generate();


    let newExpense = new ExpenseModel({

        expenseId: expenseId,
        expenseName:req.body.expenseName,
        createdBy:req.body.userId,
        users:req.body.userObj
    })

    newExpense.save((err, result) => {
        if (err) {
            logger.error(err.message, 'expense Controller: createExpense', 10)
            let apiResponse = response.generate(true, "Failed to save expense Details", 500, null);
            res.send(apiResponse);
        }

        else {
            let apiResponse = response.generate(false, "created succesfully", 200, result);
            res.send(apiResponse);
            // logger.info(result);
            eventEmitter.emit('sendExpenseCreatedMail', result);
        }

    })


}

//end createExpense function

/****************************************************************************************************/

// start updateExpense function 

let updateExpense = (req, res) => {

    let options = req.body;
    let expenseId=req.params.expenseId;

    ExpenseModel.update({ 'expenseId': req.params.expenseId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            logger.error(err.message, 'expense Controller: updateExpense', 10)
            let apiResponse = response.generate(true, "Failed to find expense Details", 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No expense Found', 'expense Controller: updateExpense')
            let apiResponse = response.generate(true, "No expense found", 404, null);
            res.send(apiResponse);
        }
        else {
            let apiResponse = response.generate(false, "expense updated succesfully", 200, result);
            res.send(apiResponse);
            console.log(expenseId);

            ExpenseModel.findOne({ 'expenseId': expenseId }).exec((err, result) => {

                if (err) {
                    logger.error(err.message, 'expense Controller: getSingleExpenseDetails', 10)
                   // let apiResponse = response.generate(true, "Failed to find expense Details", 500, null);
                   // res.send(apiResponse);
                }
                else {
                    // let apiResponse = response.generate(false, "Details Found", 200, result);
                    // res.send(apiResponse);
                    console.log(result);
                    if(result){
                        eventEmitter.emit('sendExpenseUpdateMail', result);
                    }
                    
                }

            })
        }
    })
}
//end updateExpense function
/****************************************************************************************************/

//start getAllExpenses function

let getAllExpenses = (req, res) => {

    ExpenseModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {

            if (err) {
                let apiResponse = response.generate(true, 'Failed to fetch list of Expenses ', 403, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'Expenses Are not found', 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'List of Expenses', 200, result)
                res.send(apiResponse)
            }
        })
}

//end getAllExpenses function
/****************************************************************************************************/

module.exports = {
    
    getSingleExpenseDetails: getSingleExpenseDetails,
    getAllExpenses: getAllExpenses,
    updateExpense: updateExpense,
    createExpense: createExpense,
}// end exports