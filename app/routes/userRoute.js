const express = require('express');
//const router = express.Router();
const userController = require("../controllers/userController");
const appConfig = require("../../config/appConfig")
const auth = require('../middlewares/auth');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;


    app.get(`${baseUrl}/view/all`,auth.isAuthorized, userController.getAllUser);
    
    /**
	 * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/view/all api to get allusers.
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *      {
	 *          "error": false,
     *          "message": "All User Details Found",
     *          "status": 200,
     *          "data": [
	 *				 {
     *                   "firstName": "testuser",
     *                   "lastName": "mp",
     *                   "isAdmin": true,
     *                   "email": "testusermp04@gmail.com",
     *                   "countryCode": " 91",
     *                   "userId": "Ph5K-Be7",
     *                   "userName": "testuser-admin",
     *                   "mobileNumber": 8008434546,
     *                   "createdAt": "2019-11-22T18:27:31.135Z",
     *                   "updatedAt": "2019-11-22T20:18:36.230Z",
     *                   "resetPasswordToken": "token"
     *               },
     *               {
     *                   "firstName": "giri",
     *                   "lastName": "poonati",
     *                  "isAdmin": true,
     *                   "email": "girippoonati@gmail.com",
     *                   "resetPasswordToken": "token",
     *                   "countryCode": "374",
     *                   "userId": "2g4DtolR",
     *                   "userName": "giri-admin",
     *                   "mobileNumber": 7865489655,
     *                   "createdAt": "2019-11-22T18:55:23.828Z",
     *                   "updatedAt": "2019-11-22T18:55:23.828Z"
     *               }
	 *   		]
     *    }
     *    
	 * @apiErrorExample {json} Error-Response:
	 *
	 * {
	 *   "error": true,
	 *   "message": "Failed To Find User Details",
	 *   "status": 500,
	 *   "data": null
	 *
     *  }
	 */




    // params: userId.
    app.get(`${baseUrl}/:userId/details`,auth.isAuthorized,userController.getSingleUser);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/:userId/details [Get single user].
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId The userId should be passed as the URL parameter
	 *
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *    {
     *       "error": false,
     *       "message": "User Details Found",
     *       "status": 200,
     *       "data": {
     *                  "firstName": "giri",
     *                  "lastName": "poonati",
     *                  "isAdmin": true,
     *                   "email": "girippoonati@gmail.com",
     *                   "resetPasswordToken": "token",
     *                   "countryCode": "374",
     *                   "userId": "2g4DtolR",
     *                   "userName": "giri-admin",
     *                   "mobileNumber": 7865489655,
     *                   "createdAt": "2019-11-22T18:55:23.828Z",
     *                   "updatedAt": "2019-11-22T18:55:23.828Z"
     *               
     *       `      }
     *   }
     *   @apiErrorExample {json} Error-Response:
	 *
	 * {
	 *   "error": true,
	 *   "message": "Error Occured.",
	 *   "status": 500,
	 *   "data": null
	 *  }
     */


    app.post(`${baseUrl}/signup`, userController.signUpFunction);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} userName userName of the user. (body params) (required)
     * @apiParam {string} countryCode countryCode for the mobile number of user. (body params) (required)
     * @apiParam {number} mobileNumber mobileNumber of the user. (body params) (required)
     * @apiParam {email} email email of the user. (body params) (required)
     * @apiParam {password} password password of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   {
     *    "error": false,
     *    "message": "User created",
     *    "status": 200,
     *    "data": {
     *                  "firstName": "giri",
     *                  "lastName": "poonati",
     *                  "isAdmin": true,
     *                   "email": "girippoonati@gmail.com",
     *                   "resetPasswordToken": "token",
     *                   "countryCode": "374",
     *                   "userId": "2g4DtolR",
     *                   "userName": "giri-admin",
     *                   "mobileNumber": 7865489655,
     *                   "createdAt": "2019-11-22T18:55:23.828Z",
     *                   "updatedAt": "2019-11-22T18:55:23.828Z"
     *               
     *       `      }
     *   
     *   }
     * @apiErrorExample {json} Error-Response:
	 * {
	 *   "error": true,
	 *   "message": "Failed To create User",
	 *   "status": 500,
	 *   "data": null
	 *  }
	 */
    
    // params: firstName, lastName, email, mobileNumber, password.
  
    app.post(`${baseUrl}/signin`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   {
     *       "error": false,
     *       "message": "Login Successful",
     *       "status": 200,
     *       "data": {
     *           "authToken": "lkjyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
     *           "userDetails": {
     *           "data": {
     *                  "firstName": "giri",
     *                  "lastName": "poonati",
     *                  "isAdmin": true,
     *                   "email": "girippoonati@gmail.com",
     *                   "resetPasswordToken": "token",
     *                   "countryCode": "374",
     *                   "userId": "2g4DtolR",
     *                   "userName": "giri-admin",
     *                   "mobileNumber": 7865489655,
     *                   "createdAt": "2019-11-22T18:55:23.828Z",
     *                   "updatedAt": "2019-11-22T18:55:23.828Z"
     *               
     *       `      }
     *       }
     *   
     *   }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	 *   "error": true,
	 *   "message": "Failed To Login User",
	 *   "status": 500,
	 *   "data": null
	 *  }
     */

    // params: email, password.

    app.post(`${baseUrl}/forgotPassword`, userController.forgotPassword);
    /**
     * @api {post} /api/v1/users/forgotPassword api to generate Reset Token
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} email of the user passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"Password Reset Token Sent successfully",
     *   "status":200,
     *   "data": []
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":400,
     *      "data":null
     *    }
     */


    app.post(`${baseUrl}/resetPassword`, userController.resetPassword);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/resetPassword api to reset password.
     *
     * @apiParam {String} resetPasswordToken of the user passed as a body parameter
     * @apiParam {String} password of the user passed as a body parameter
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *    {
     *       "error": false,
     *       "message": "Your Password Is Reset Successfully",
     *       "status": 200,
     *       "data": {
     *                  "firstName": "Anvesh Reddy",
     *                  "lastName": "Yedavelly",
     *                  "isAdmin": false,
     *                  "email": "vc16anvesh@gmail.com",
     *                  "countryCode": " 91",
     *                  "userId": "ERE32e8s",
     *                  "userName": "anvesh-004",
     *                  "mobileNumber": 8008434433,
     *                  "createdAt": "2019-11-21T15:19:01.470Z",
     *                  "updatedAt": "2019-11-27T16:34:46.683Z",
     *               }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	 *   "error": true,
	 *   "message": "Failed To Login User",
	 *   "status": 500,
	 *   "data": null
	 *  }
     */

    // params: email, password.


    
    app.post(`${baseUrl}/logout`, userController.logout);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout api to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *    {
     *       "error": false,
     *       "message": "Logged Out Successfully",
     *       "status": 200,
     *       "data": null
     *   
     *   }
     */

    // auth token params: userId.

}
