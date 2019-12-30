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
            eventEmitter.emit('saveCreateExpenseHistory',result);
                eventEmitter.emit('sendExpenseCreatedMail', result);

         
        }

    })
}

//end createExpense function

/****************************************************************************************************/

// start updateExpense function 

let updateExpense = (req, res) => {
    // req.body.paidBy.user = mongoose.Types.ObjectId(req.body.paidBy.user);
    // req.body.usersInvolved.user = mongoose.Types.ObjectId(req.body.usersInvolved.user);

    // let usersInvolved1=JSON.parse(req.body.usersInvolved);
    // let paidBy1=JSON.parse(req.body.paidBy);

    // let optionsobj = { groupId: req.body.groupId,
    // expenseTitle:req.body.expenseTitle,
    // expenseDescription:req.body.expenseDescription,
    // expenseAmount: req.body.expenseAmount,
    // createdBy: req.body.createdBy,
    // paidBy: paidBy1,

    // usersInvolved: usersInvolved
    // }
    logger.info(req.body.expenseAmount);
    logger.info("ExpenseID"+req.params.expenseId);

    ExpenseModel.findOneAndUpdate(
	{
		'expenseId' : req.params.expenseId
	},
	{
		$set :
		{
			"expenseTitle" : req.body.expenseTitle,
            "expenseDescription" : req.body.expenseDescription,
            "expenseAmount":req.body.expenseAmount,
            "paidBy": req.body.paidBy,
            "usersInvolved":req.body.usersInvolved
		}
	},{new: true}
   ).exec((err, result) => {
    if (err) {
        logger.error(err.message, 'expense Controller: updateexpense', 10)
        let apiResponse = response.generate(true, "Failed to find expense Details", 500, null);
        res.send(apiResponse);
    }
    else if (check.isEmpty(result)) {
        logger.info('No expense Found', 'expense Controller: updateexpense')
        let apiResponse = response.generate(true, "No expense found", 404, null);
        res.send(apiResponse);
    }
    else {
        let apiResponse = response.generate(false, "expense updated succesfully", 200, result);
        res.send(apiResponse);
        //console.log(meetingId);

     ExpenseModel.findOne({ 'expenseId': req.params.expenseId })
     .populate({ path: 'createdBy', select: 'firstName' })
                .populate({path:'paidBy.user',select:'firstName'})
                .populate({path:'usersInvolved.user',select:'firstName'})
                .exec((err, data) => {
        if (err) {
            logger.error(err.message, 'expense Controller: updateExpense', 10)
            //let apiResponse = response.generate(true, "Failed to find expense Details", 500, null);
           // res.send(apiResponse);
        }
        else if (check.isEmpty(data)) {
            logger.info('No expense Found', 'expense Controller: updateExpense')
           // let apiResponse = response.generate(true, "No expense found", 404, null);
            //res.send(apiResponse);
        }
        else {

                        eventEmitter.emit('saveUpdateExpenseHistory',data);
                        eventEmitter.emit('sendExpenseUpdateMail', data);
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

let deleteExpense = (req, res) => {

    ExpenseModel.findOneAndRemove({ 'expenseId': req.params.expenseId }).select(' -__v -_id').exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'expenseController: deleteExpense', 10)
            let apiResponse = response.generate(true, 'Failed To delete expense', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No expense Found', 'expenseController: deleteExpense')
            let apiResponse = response.generate(true, 'No expense Found', 404, null)
            res.send(apiResponse)
        } else {

            // req.body.previous = req.body.previous.split('/uploads/')[1]
            // fs.unlinkSync('./uploads/' +  req.body.previous);

            let apiResponse = response.generate(false, 'Deleted the expense successfully', 200, result)
            res.send(apiResponse);
            eventEmitter.emit('saveDeleteExpenseHistory',result);
            eventEmitter.emit('sendExpenseDeleteMail', result);
        }
    });

}

let getExpenseHistory =(req,res)  =>{

    ExpenseHistoryModel.find({ 'expenseId': req.params.expenseId })
    .populate({ path: 'actionDoneBy', select: 'firstName' })
    .exec((err, result) => {

        if (err) {
            let apiResponse = response.generate(true, 'Failed to fetch Expense ', 403, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Expense not found', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Expense History Found', 200, result)
            res.send(apiResponse)
        }
    })

}

/****************************************************************************************************/

eventEmitter.on('saveCreateExpenseHistory',(data) =>{

        let newExpenseHistory =new ExpenseHistoryModel({

            expenseId:data.expenseId,
            expenseName:data.expenseTitle,
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
                logger.error("history saved succesfully", 'expense Controller: saveCreateExpenseHistory');
            }
        })

})
eventEmitter.on('saveUpdateExpenseHistory',(data) =>{

    let newExpenseHistory =new ExpenseHistoryModel({

        expenseId:data.expenseId,
        expenseName:data.expenseTitle,
        expenseAmount:data.expenseAmount,
        actionType: "update Expense",
        actionDoneBy: data.createdBy,
        message: "updated Expense"


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

eventEmitter.on('saveDeleteExpenseHistory',(data) =>{

    let newExpenseHistory =new ExpenseHistoryModel({

        expenseId:data.expenseId,
        expenseAmount:data.expenseAmount,
        expenseName:data.expenseTitle,
        actionType: "delete Expense",
        actionDoneBy: data.createdBy,
        message: "deleted Expense"


    })
    newExpenseHistory.save((err,result)=>{
        if(err){
            logger.error(err.message, 'expense Controller: saveDeleteExpenseHistory', 10)
        }
        else{
            logger.error("history saved succesfully", 'expense Controller: saveDeleteExpenseHistory', 10)
        }
    })

})




//send email for  expense creation code start
eventEmitter.on('sendExpenseCreatedMail', (data) => {

    if (data.groupId) {
        groupModel.findOne({ groupId: data.groupId })
        .populate({path:'users',select:'firstName email'})
        .exec((err, groupDetails) => {
            if (err) {
                logger.error('Error while finding user', 'expenseController: findUser()', 7)
            }
            else if (check.isEmpty(groupDetails)) {

                logger.error('No User Found', 'expenseController: findUser()', 7)
            }
            else  {
                  
                    let users=groupDetails.users;
                    console.log(users);
                    let toList=new Array();
                   
                    users.forEach(element => {
                            logger.info(element.email)
                         toList.push(element.email);
                           
                        })
                  
                      
                        let text="Expense"+data.expenseTitle+"created by"+data.createdBy.firsName+"with amount"+data.expenseAmount;
                mailLib.sendMail(toList,"Expense Creation Alert",text);
            }
        });

    } else {
        logger.error('userId is missing','sendexpenseCreatedMail');
    }
});


//send email for expense creation  code is end
eventEmitter.on('sendExpenseUpdateMail', (data) => {
    if (data.groupId) {
        groupModel.findOne({ groupId: data.groupId })
        .populate({path:'users',select:'firstName email'})
        .exec((err, groupDetails) => {
            if (err) {
                logger.error('Error while finding user', 'expenseController: findUser()', 7)
            }
            else if (check.isEmpty(groupDetails)) {

                logger.error('No User Found', 'expenseController: findUser()', 7)
            }
            else  {
                  
                    let users=groupDetails.users;
                    let toList=[];
                    
                    users.forEach(element => {
                        toList.push(users.email);
                      });
                        let text="Expense"+data.expenseTitle+"updated by"+data.createdBy.firsName+"with amount"+data.expenseAmount;
                mailLib.sendMail(toList,"Expense Update Alert",text);
            }
        });

    } else {
        logger.error('userId is missing','sendexpenseCreatedMail');
    }
});
//send email for expense creation  code is end
eventEmitter.on('sendExpenseDeleteMail', (data) => {
    if (data.groupId) {
        groupModel.findOne({ groupId: data.groupId })
        .populate({path:'users',select:'firstName email'})
        .exec((err, groupDetails) => {
            if (err) {
                logger.error('Error while finding user', 'expenseController: findUser()', 7)
            }
            else if (check.isEmpty(groupDetails)) {

                logger.error('No User Found', 'expenseController: findUser()', 7)
            }
            else  {
                  
                    let users=groupDetails.users;
                    let toList=[];
                    
                    users.forEach(element => {
                        toList.push(users.email);
                      });
                        let text="Expense"+data.expenseTitle+"deleted by"+data.createdBy.firsName;
                mailLib.sendMail(toList,"Expense Delete Alert",text);
            }
        });

    } else {
        logger.error('userId is missing','sendExpenseDeleteMail');
    }
});

let getUserOutstandingLent =(req,res)=>{

    // const user_Id=JSON.parse(req.params.user_Id);
 
         ExpenseModel.aggregate([ {$unwind: '$paidBy'},
         {$match:{'paidBy.user':mongoose.Types.ObjectId(req.params.user_Id)}},
         {$group:{'_id':'$paidBy.user','totalAmountLent':{$sum:'$paidBy.amountLent'}}}])
        .exec((err,result)=>{
 
         if (err) {
             logger.error(err.message, 'expense Controller: getUserOutstandingLent', 10)
             let apiResponse = response.generate(true, "Failed to fetch Details", 500, null);
             res.send(apiResponse);
         }
         else if (check.isEmpty(result)) {
             logger.info('No expense Found', 'expense Controller: getUserOutstandingLent')
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
 
     let getUserOutstandingSpent =(req,res)=>{
 
       //const user_Id=JSON.parse(req.params.user_Id);
         ExpenseModel.aggregate([ {$unwind: '$usersInvolved'},
         {$match:{'usersInvolved.user':mongoose.Types.ObjectId(req.params.user_Id)}},
         {$group:{'_id':'$usersInvolved.user','totalAmountSpent':{$sum:'$usersInvolved.amountSpent'}}}])
              .exec((err,result)=>{
       
               if (err) {
                   logger.error(err.message, 'expense Controller: getUserOutstandingSpent', 10)
                   let apiResponse = response.generate(true, "Failed to fetch Details", 500, null);
                   res.send(apiResponse);
               }
               else if (check.isEmpty(result)) {
                   logger.info('No expense Found', 'expense Controller: getUserOutstandingSpent')
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


module.exports = {

    getSingleExpenseDetails: getSingleExpenseDetails,
    getAllExpenses: getAllExpenses,
    updateExpense: updateExpense,
    createExpense: createExpense,
    deleteExpense:deleteExpense,
    getExpenseHistory:getExpenseHistory,
    getUserOutstandingLent:getUserOutstandingLent,
    getUserOutstandingSpent:getUserOutstandingSpent,
    
}// end exports