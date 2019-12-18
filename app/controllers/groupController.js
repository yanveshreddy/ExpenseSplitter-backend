const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');

const check = require('../libs/checkLib');
const nodemailer = require('nodemailer');

const groupModel = mongoose.model('Group');


/*Controller Functions */

// start getSingleGroupDetails function 

let getSingleGroupDetails = (req, res) => {

    groupModel.findOne({ 'groupId': req.params.groupId })
    .select('-__v -_id')
    .lean()
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


    let newgroup = new groupModel({

        groupId: groupId,
        groupName:req.body.groupName,
        createdBy:req.body.userId,
        users:req.body.userObj
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
            // logger.info(result);
            eventEmitter.emit('sendgroupCreatedMail', result);
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

//start getAllgroups function

let getAllGroups = (req, res) => {

    groupModel.find()
        .select(' -__v -_id')
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

module.exports = {
    
    getSingleGroupDetails: getSingleGroupDetails,
    getAllGroups: getAllGroups,
    updateGroup: updateGroup,
    createGroup: createGroup,
}// end exports