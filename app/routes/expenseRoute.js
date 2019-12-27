const express = require('express');
//const router = express.Router();
const expenseController = require("../controllers/expenseController");
const appConfig = require("../../config/appConfig")
const auth = require('../middlewares/auth');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/expenses`;

    app.get(`${baseUrl}/:user_Id/getOutstandingBalances`,auth.isAuthorized, expenseController.getOutstandingBalances);

    app.get(`${baseUrl}/:groupId/view/all`,auth.isAuthorized, expenseController.getAllExpenses);

    /**
	 * @apiGroup expenses
     * @apiVersion  1.0.0
     * @api {get} /api/v1/expenses/view/all  [Get all expenses].
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *      {
	 *          "error": false,
     *          "message": "All expenses Found",
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


     // params: expenseId.
    app.get(`${baseUrl}/:expenseId/details`,auth.isAuthorized,expenseController.getSingleExpenseDetails);
    /**
     * @apiGroup expenses
     * @apiVersion  1.0.0
     * @api {post} /api/v1/expenses/:expenseId/details [Get single expense details].
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} expenseId The expenseId should be passed as the URL parameter
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
     *                   "expenseId": "2g4DtolR",
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

    app.post(`${baseUrl}/createExpense`,auth.isAuthorized,expenseController.createExpense);

    /**
     * @api {post} /api/v1/expenses/createExpense [Api to create group]
     * @apiVersion 1.0.0
     * @apiGroup expenses
     * 
     * 
     * @apiParam {String} meetingTitle meetingTitle of the meeting passed as a body parameter
     * @apiParam {String} meetingPurpose meetingPurpose of the meeting passed as a body parameter
     * @apiParam {String} meetingPlace meetingPlace of the meeting passed as a body parameter
     * @apiParam {String} userId userId of the user to whom meeting is assigned passed as a body parameter
     * @apiParam {String} userName userName of the user to whom meeting is assigned passed as a body parameter
     * @apiParam {String} adminId adminId of the user who created the meeting passed as a body parameter
     * @apiParam {String} adminUserName adminUserName of the user who created the meeting passed as a body parameter
     * @apiParam {String} meetingDate meetingDate of the meeting passed as a body parameter
     * @apiParam {String} meetingStartTime meetingStartTime of the meeting passed as a body parameter
     * @apiParam {String} meetingEndTime meetingEndTime of the meeting passed as a body parameter
     * @apiParam {String} authToken of the user passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"New group Is Created Successfully",
     *   "status":200,
     *   "data":
     *           {
     *              "title": "meeting planner Review",
     *              "purpose": "to test application update",
     *              "location": "hyderabad",
     *              "color": "#00ff00",
     *              "meetingId": "47MChBzK",
     *              "start": "2019-11-30T20:30:00.000Z",
     *              "end": "2019-11-30T20:30:00.000Z",
     *              "startHour": 1,
     *              "startMinute": 33,
     *              "endHour": 20,
     *              "endMinute": 30,
     *              "adminId": "2g4DtolR",
     *              "adminUserName": "undefined",
     *              "userId": "ERE32e8s",
     *              "createdAt": "2019-11-25T20:26:57.707Z",
     *              "updatedAt": "2019-11-27T11:54:53.645Z"
     *            }  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":400/500/403,
     *      "data":null
     *    }
     */


    app.put(`${baseUrl}/:expenseId/updateExpense`,auth.isAuthorized,expenseController.updateExpense);
     /**
     * @api {post} /api/v1/expenses/:expenseId/updateExpense [Api to update group]
     * @apiVersion 1.0.0
     * @apiGroup expenses 
     * 
     * @apiParam {String} authToken of the user passed as a body parameter
     * @apiParam {String} expenseId of the group passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"group Is Edited Successfully",
     *   "status":200,
     *   "data": [
     *              "n": 1,
     *              "nModified": 1,
     *               "ok": 1
     *           ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":400/500/403,
     *      "data":null
     *    }
     */

    app.post(`${baseUrl}/:expenseId/deleteExpense`,auth.isAuthorized,expenseController.deleteExpense);
    /**
     * @api {post} /api/v1/expenses/:expenseId/deleteExpense [Api to delete group]
     * @apiVersion 1.0.0
     * @apiGroup expenses
     * 
     * 
     * @apiParam {String} authToken of the user passed as a body parameter
     * @apiParam {String} expenseId of the group passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"group Is Deleted Successfully",
     *   "status":200,
     *   "data": []  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured while deleting",
     *      "status":500,
     *      "data":null
     *    }
     */


}