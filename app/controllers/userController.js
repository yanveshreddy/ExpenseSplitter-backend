const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const passwordLib = require('../libs/genratePasswordLib');
const tokenLib = require('../libs/tokenLib');
const check = require('../libs/checkLib');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

/* Models */
const UserModel = mongoose.model('User');
const AuthModel = mongoose.model('Auth');
// start user signup function 

let signUpFunction = (req, res) => {

    // start validateUserInput function
    let validateUserInput = () => {

        return new Promise((resolve, reject) => {

            if (req.body.email) {

                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not meet the requirement', 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                }
                else {
                    resolve(req);
                }
            }
            else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }


        })
    }
    // end validateUserInput function


    //Create User function start 
    let createUser = () => {

        return new Promise((resolve, reject) => {

            //Checking whether the email id exists in User Model
            UserModel.findOne({ email: req.body.email })
                .exec((err, userDetails) => {

                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    }
                    else if (check.isEmpty(userDetails)) {

                        
                        // Creating User and saving in User Model by extracting the required fields from body parameters.

                        let newUser = new UserModel({

                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            countryCode: req.body.countryCode,
                            mobileNumber: req.body.mobileNumber,
                            email: req.body.email.toLowerCase(),
                            password: passwordLib.hashpassword(req.body.password)

                        })

                        newUser.save((err, newUser) => {
                            if (err) {
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }

                        })
                    }
                    else {
                        logger.error('user already present', 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Duplicate user as user already exists', 403, null)
                        reject(apiResponse)
                    }

                })
        })
    }
    //end createUser function

    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password;
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}// end user signup function 



// start of login function 
let loginFunction = (req, res) => {

    let findUser = () => {

        return new Promise((resolve, reject) => {
            //   UserModel.findOne({email: req.body.email})
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }

        })

    }


    let validatePassword = (retrievedUserDetails) => {

        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {

                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }

            })

        })
    }

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {

            tokenLib.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    // console.log(err)
                    logger.error(err.message, 'userController: generateToken()', 10)
                    let apiResponse = response.generate(true, 'Token Generation Failed', 500, null)
                    reject(apiResponse)
                }
                else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }

            })

        })

    }

    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}


// end of the login function 


let forgotPassword = (req, res) => {

    let findUser = () => {

        return new Promise((resolve, reject) => {
            //   UserModel.findOne({email: req.body.email})
            if (req.body.email) {
                console.log("req body email is there");
                // console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)

                        const resetToken = crypto.randomBytes(20).toString('hex');

                        userDetails.resetPasswordToken = resetToken;

                        userDetails.save((err, newUser) => {
                            if (err) {
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                //  console.log(newUserObj);
                                resolve(newUserObj)
                            }

                        })
                    }
                });

            }
            else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }

        })
    }


    //send mail code start 
    let sendMailWithResetToken = (newUserObj) => {

        return new Promise((resolve, reject) => {

            if (newUserObj) {

                // console.log(newUserObj);

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'meetingplanner.helpdesk@gmail.com',
                        pass: 'Mphelpdesk@004'
                    }
                });
                let mailOptions = {
                    from: '"Meeting Planner"',
                    to: newUserObj.email,
                    subject: '"Link to Password Reset-Meeting Planner"',
                    html: `<p>YOUR RESET PASSWORD Token IS</p> <h1>${newUserObj.resetPasswordToken}</h1>`
                }
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        logger.captureError('some error occured', 'sendmail', 9)
                        let apiResponse = response.generate(true, 'some error occured', 500, null)
                        reject(apiResponse)
                    }
                    else {
                        resolve('Password Reset Token Sent successfully')
                    }
                })
            }
            else {
                let apiResponse = response.generate(true, 'some error occured', 500, null);
                reject(apiResponse);

            }
        })
    }
    //end send mail

    findUser(req, res)
        .then(sendMailWithResetToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Reset Token send your Email', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}



let resetPassword = (req, res) => {

    if (req.body.resetPasswordToken) {


        UserModel.findOne({ resetPasswordToken: req.body.resetPasswordToken }, (err, userDetails) => {
            if (err) {
                console.log(err)
                logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(userDetails)) {
                logger.error('No User Found', 'userController: findUser()', 7)
                let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('User Found', 'userController: findUser()', 10)



                userDetails.password = passwordLib.hashpassword(req.body.password);
                userDetails.resetPasswordToken = "";

                userDetails.save((err, updatedUser) => {
                    if (err) {
                        logger.error(err.message, 'userController: resetPassword', 10)
                        let apiResponse = response.generate(true, 'Failed to update User password', 500, null)
                        res.send(apiResponse)
                    }
                    else {
                        let updatedUserObj = updatedUser.toObject()
                        delete updatedUserObj.password;
                        
                        delete updatedUserObj.__v;

                        let apiResponse = response.generate(false, 'Your Password Is Reset Successfully', 200, updatedUserObj)
                        res.send(apiResponse)
                    }
                })
            }
        });

    } else {
        let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
        res.send(apiResponse);
    }


}

let getAllUser = (req, res) => {

    UserModel.find()
        .select('-password -__v ')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })

}

let getSingleUser = (req, res) => {

    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v ')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })

}
let logout = (req, res) => {


} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    getAllUser: getAllUser,
    getSingleUser, getSingleUser,
    logout: logout

}// end exports
