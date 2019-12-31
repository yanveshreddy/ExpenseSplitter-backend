const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');

const check = require('../libs/checkLib');
const nodemailer = require('nodemailer');

const groupModel = mongoose.model('Group');
const ExpenseModel= mongoose.model('Expense')


/*Controller Functions */

// start getSingleGroupDetails function 

let getSingleGroupDetails = (req, res) => {

    groupModel.findOne({ 'groupId': req.query.groupId })
              .populate({path:'users',select:'firstName'})
              .populate({path:'createdBy',select:'firstName'})
    .exec((err, result) => {
        if (err) {
            logger.error(err.message, 'group Controller: getSingleGroupDetails', 10)
            let apiResponse = response.generate(true, "Failed to find group Details", 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No group Found', 'group Controller: getSingleGroupDetails')
            let apiResponse = response.generate(true, "No group found", 404, null);
            res.send(apiResponse);
        }
        else {
            let apiResponse = response.generate(false, "group Details Found", 200, result);
            res.send(apiResponse);
        }
    })
}

//end getSinglegroupDetails function

/****************************************************************************************************/

// start create group function 

let createGroup = (req, res) => {

    const groupId = shortid.generate();
    const groupUsers=JSON.parse(req.body.users);
   // let assigneeObj=JSON.parse(req.body.assignee);

    let newgroup = new groupModel({

        groupId: groupId,
        groupName:req.body.groupName,
        groupDescription:req.body.groupDescription,
        createdBy:req.body.createdBy,
        users:groupUsers
    })

    newgroup.save((err, result) => {
        if (err) {
            logger.error(err.message, 'group Controller: creategroup', 10)
            let apiResponse = response.generate(true, "Failed to save group Details", 500, null);
            res.send(apiResponse);
        }

        else {
            let apiResponse = response.generate(false, "created succesfully", 200, result);
            res.send(apiResponse);
            logger.info(result);
            //eventEmitter.emit('sendgroupCreatedMail', result);
        }

    })


}

//end creategroup function

/****************************************************************************************************/

// start updategroup function 

let updateGroup = (req, res) => {

    let options = req.body;
    let groupId=req.params.groupId;

    groupModel.update({ 'groupId': req.params.groupId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            logger.error(err.message, 'group Controller: updategroup', 10)
            let apiResponse = response.generate(true, "Failed to find group Details", 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No group Found', 'group Controller: updategroup')
            let apiResponse = response.generate(true, "No group found", 404, null);
            res.send(apiResponse);
        }
        else {
            let apiResponse = response.generate(false, "group updated succesfully", 200, result);
            res.send(apiResponse);
            console.log(groupId);

            groupModel.findOne({ 'groupId': groupId }).exec((err, result) => {

                if (err) {
                    logger.error(err.message, 'group Controller: getSinglegroupDetails', 10)
                   // let apiResponse = response.generate(true, "Failed to find group Details", 500, null);
                   // res.send(apiResponse);
                }
                else {
                    // let apiResponse = response.generate(false, "Details Found", 200, result);
                    // res.send(apiResponse);
                    console.log(result);
                    if(result){
                        eventEmitter.emit('sendgroupUpdateMail', result);
                    }
                    
                }

            })
        }
    })
}
//end updategroup function
/****************************************************************************************************/
//start getAllUsersForAGroup function

let getAllUsersForAGroup = (req, res) => {

    groupModel.findOne({'groupId': req.query.groupId})
             .populate({path:'users',select:'firstName'})
             .populate({path:'createdBy',select:'firstName'})
             .exec((err, result) => {

            if (err) {
                let apiResponse = response.generate(true, 'Failed to fetch list of users in a group ', 403, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'group  not found', 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'List of users in a group', 200, result)
                logger.info(result);
                res.send(apiResponse)
            }
        })
}

//end getAllUsersForAGroup function
/****************************************************************************************************/

//start getAllGroupsForaUser function

let getAllGroupsForaUser = (req, res) => {
    
    const userId=JSON.parse(req.query.userId);
   // let ObjectId = mongoose.Types.ObjectId; 
    //const userId= new ObjectId(req.query.userId)
   
    groupModel.find({'users': mongoose.Types.ObjectId(userId)})
              .populate({ path: 'createdBy', select: 'firstName' })
              .populate({path:'users',select:'firstName'})
            .exec((err, result) => {

                if (err) {
                    let apiResponse = response.generate(true, 'Failed to fetch list of groups ', 403, null)
                    logger.error(req.query.userId)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'groups Are not found', 500, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'List of groups', 200, result);
                    logger.info(result);
                    res.send(apiResponse)
                }
            })
}

//end getAllGroupsForaUser function
/****************************************************************************************************/

//start getAllgroups function

let getAllGroups = (req, res) => {

    groupModel.find()
        .select(' -_v -_id')
        .lean()
        .exec((err, result) => {

            if (err) {
                let apiResponse = response.generate(true, 'Failed to fetch list of groups ', 403, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'groups Are not found', 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'List of groups', 200, result)
                res.send(apiResponse)
            }
        })
}

//end getAllgroups function
/****************************************************************************************************/
let groupOutstandingLent =(req,res) =>{
 
    ExpenseModel.aggregate([ {$match:{'groupId':req.params.groupId}},{$unwind: '$paidBy'},
    {$group:{'_id':'$paidBy.user','totalAmountLent':{$sum:'$paidBy.amountLent'}}},
    { $lookup: {from: 'users', localField: '_id', foreignField: '_id', as: 'user'}},
          {
            $project: {
                totalAmountLent:1,
              user: {
                firstName: 1 
              }
            }
          },
    ])
    .exec((err,result)=>{

        if (err) {
            logger.error(err.message, 'expense Controller: groupOutstandingLent', 10)
            let apiResponse = response.generate(true, "Failed to fetch Details", 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            logger.info('No expense Found', 'expense Controller: groupOutstandingLent')
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

  let groupOutstandingSpent =(req,res) =>{

   ExpenseModel.aggregate([ {$match:{'groupId':req.params.groupId}},{$unwind: '$usersInvolved'},
   {$group:{'_id':'$usersInvolved.user','totalAmountSpent':{$sum:'$usersInvolved.amountSpent'}}},
   { $lookup: {from: 'users', localField: '_id', foreignField: '_id', as: 'user'}},
         {
           $project: {
            totalAmountSpent:1,
             user: {
               firstName: 1 
             }
           }
         },
   ])
   .exec((err,result)=>{

       if (err) {
           logger.error(err.message, 'expense Controller: groupOutstandingSpent', 10)
           let apiResponse = response.generate(true, "Failed to fetch Details", 500, null);
           res.send(apiResponse);
       }
       else if (check.isEmpty(result)) {
           logger.info('No expense Found', 'expense Controller: groupOutstandingSpent')
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
    
    getSingleGroupDetails: getSingleGroupDetails,
    getAllGroups: getAllGroups,
    updateGroup: updateGroup,
    createGroup: createGroup,
    getAllGroupsForaUser:getAllGroupsForaUser,
    getAllUsersForAGroup:getAllUsersForAGroup,
    groupOutstandingLent:groupOutstandingLent,
    groupOutstandingSpent:groupOutstandingSpent
}// end exports