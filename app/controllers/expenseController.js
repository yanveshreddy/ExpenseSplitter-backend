const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');

const check = require('../libs/checkLib');
const nodemailer = require('nodemailer');
const mailLib =require('../libs/mailLib')

const ExpenseModel = mongoose.model('Expense');
const groupModel = mongoose.model('Group');
let events = require('events');
let eventEmitter = new events.EventEmitter();
const ExpenseHistoryModel = mongoose.model('ExpenseHistory')
/*Controller Functions */

let getOutstandingBalances =(req,res)=>{

    //let user_Id=JSON.parse(req.query.user_Id);mongoose.Types.ObjectId(

    ExpenseModel.aggregate([{$match:{'paidBy.user':req.params.user_Id}}
    ,{$group:{'_id':'paidBy.user','totalAmountLent':{$sum:'paidBy.amountLent'}}}
    ]).exec((err,result)=>{

        if (err) {
            logger.error(err.message, 'expense Controller: getOutstandingBalances', 10)
            let apiResponse = response.generate(true, "Failed to fetch Details", 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No expense Found', 'expense Controller: getOutstandingBalances')
            let apiResponse = response.generate(true, "No records found", 404, null);
            res.send(apiResponse);
        }
        else {
            let apiResponse = response.generate(false, "data Found", 200, result);
            logger.info(result)
            res.send(apiResponse);
        }
    
    })

    }


// start getSingleExpenseDetails function 

let getSingleExpenseDetails = (req, res) => {

    ExpenseModel.findOne({ 'expenseId': req.params.expenseId })
                .populate({ path: 'createdBy', select: 'firstName' })
                .populate({path:'paidBy.user',select:'firstName'})
                .populate({path:'usersInvolved.user',select:'firstName'})
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
    logger.info(req.body.paidBy);

    
    let usersInvolved=JSON.parse(req.body.usersInvolved);
    let paidBy1=JSON.parse(req.body.paidBy);

    // if(req.body.paidBy !="undefined" && typeof(req.body.paidBy) !="undefined")
    // {
    //     const PaidBy=JSON.parse(req.body.PaidBy);
        
    // }
    // if(req.body.usersInvolved !="undefined" && typeof(req.body.usersInvolved) !="undefined")
    // {
    //     const usersInvolved=JSON.parse(req.body.usersInvolved);
    // }
   
    
    let newExpense = new ExpenseModel({

        expenseId: expenseId,
        groupId: req.body.groupId,
        expenseTitle:req.body.expenseTitle,
        expenseDescription:req.body.expenseDescription,
        expenseAmount: req.body.expenseAmount,
        createdBy: req.body.createdBy,
        paidBy: paidBy1,
        usersInvolved: usersInvolved
        
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
            eventEmitter.emit('saveCreateExpenseHistory',result)
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
                        eventEmitter.emit('saveUpdateExpenseHistory',result);
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

    ExpenseModel.find({'groupId':req.params.groupId})
                .populate({ path: 'createdBy', select: 'firstName' })
                .populate({path:'paidBy.user',select:'firstName'})
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
eventEmitter.on('saveCreateExpenseHistory',(data) =>{

        let newExpenseHistory =new ExpenseHistoryModel({

            expenseId:data.expenseId,
            expenseAmount:data.expenseAmount,
            actionType: "create expense",
            actionDoneBy: data.createdBy,
            message: "created expense"


        })
        newExpenseHistory.save((err,result)=>{
            if(err){
                logger.error(err.message, 'expense Controller: saveCreateExpenseHistory', 10)
            }
            else{
                logger.error("history saved succesfully", 'expense Controller: saveCreateExpenseHistory')
            }
        })

})
eventEmitter.on('saveUpdateExpenseHistory',(data) =>{

    let newExpenseHistory =new ExpenseHistoryModel({

        expenseId:data.expenseId,
        expenseAmount:data.expenseAmount,
        actionType: "update Expense",
        actionDoneBy: data.createdBy,
        message: "update Expense"


    })
    newExpenseHistory.save((err,result)=>{
        if(err){
            logger.error(err.message, 'expense Controller: saveUpdateExpenseHistory', 10)
        }
        else{
            logger.error("history saved succesfully", 'expense Controller: saveUpdateExpenseHistory', 10)
        }
    })

})





//send email for  meeting creation code start
eventEmitter.on('sendExpenseCreatedMail', (data) => {

    if (data.groupId) {
        groupModel.findOne({ groupId: data.groupId })
        .populate({path:'users',select:'firstName email'})
        .exec((err, groupDetails) => {
            if (err) {
                logger.error('Error while finding user', 'meetingController: findUser()', 7)
            }
            else if (check.isEmpty(groupDetails)) {

                logger.error('No User Found', 'meetingController: findUser()', 7)
            }
            else  {
                  
                    let users=groupDetails.users;
                    let toList=[];
                    
                    users.forEach(element => {
                        this.toList.push(users.email);
                      });
                        let text="Expense"+data.expenseTitle+"created by"+data.createdBy.firsName+"with amount"+data.expenseAmount;
                mailLib.sendMail(toList,"Expense Creation Alert",text);
            }
        });

    } else {
        logger.error('userId is missing','sendMeetingCreatedMail');
    }
});


//send email for meeting creation  code is end
eventEmitter.on('sendExpenseUpdateMail', (data) => {
    if (data.groupId) {
        groupModel.findOne({ groupId: data.groupId })
        .populate({path:'users',select:'firstName email'})
        .exec((err, groupDetails) => {
            if (err) {
                logger.error('Error while finding user', 'meetingController: findUser()', 7)
            }
            else if (check.isEmpty(groupDetails)) {

                logger.error('No User Found', 'meetingController: findUser()', 7)
            }
            else  {
                  
                    let users=groupDetails.users;
                    let toList=[];
                    
                    users.forEach(element => {
                        this.toList.push(users.email);
                      });
                        let text="Expense"+data.expenseTitle+"updated by"+data.createdBy.firsName+"with amount"+data.expenseAmount;
                mailLib.sendMail(toList,"Expense Update Alert",text);
            }
        });

    } else {
        logger.error('userId is missing','sendMeetingCreatedMail');
    }
});




module.exports = {
    getOutstandingBalances:getOutstandingBalances,
    getSingleExpenseDetails: getSingleExpenseDetails,
    getAllExpenses: getAllExpenses,
    updateExpense: updateExpense,
    createExpense: createExpense,
}// end exports