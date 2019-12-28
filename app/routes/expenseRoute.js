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
            				 {
                    "expenseTitle": "ksjhskjfh",
                    "expenseDescription": "skfjdkfl",
                    "_id": "5e064750f680833f80d85de7",
                    "expenseId": "1MpzqViy",
                    "groupId": "qD9Nvqqv",
                    "expenseAmount": 500,
                    "createdBy": {
                        "firstName": "Anvesh Reddy",
                        "_id": "5df90c4fc8e7ad1124e0b59c"
                    },
                    "paidBy": [
                        {
                            "_id": "5e064750f680833f80d85de8",
                            "user": {
                                "firstName": "giri",
                                "_id": "5e027ad31a8953099ccaee24"
                            },
                            "amountLent": 500
                        }
                    ],
                    "usersInvolved": [
                        {
                            "_id": "5e064750f680833f80d85dea",
                            "user": "5df90c4fc8e7ad1124e0b59c",
                            "amountSpent": 250
                        },
                        {
                            "_id": "5e064750f680833f80d85de9",
                            "user": "5e027ad31a8953099ccaee24",
                            "amountSpent": 250
                        }
                    ],
                    "createdAt": "2019-12-27T18:02:56.391Z",
                    "updatedAt": "2019-12-27T18:02:56.391Z",
                    "__v": 0
                },
                
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
     * @api {get} /api/v1/expenses/:expenseId/details [Get single expense details].
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
            *                 
                    "expenseTitle": "ksjhskjfh",
                    "expenseDescription": "skfjdkfl",
                    "_id": "5e064750f680833f80d85de7",
                    "expenseId": "1MpzqViy",
                    "groupId": "qD9Nvqqv",
                    "expenseAmount": 500,
                    "createdBy": {
                        "firstName": "Anvesh Reddy",
                        "_id": "5df90c4fc8e7ad1124e0b59c"
                    },
                    "paidBy": [
                        {
                            "_id": "5e064750f680833f80d85de8",
                            "user": {
                                "firstName": "giri",
                                "_id": "5e027ad31a8953099ccaee24"
                            },
                            "amountLent": 500
                        }
                    ],
                    "usersInvolved": [
                        {
                            "_id": "5e064750f680833f80d85dea",
                            "user": "5df90c4fc8e7ad1124e0b59c",
                            "amountSpent": 250
                        },
                        {
                            "_id": "5e064750f680833f80d85de9",
                            "user": "5e027ad31a8953099ccaee24",
                            "amountSpent": 250
                        }
                    ],
                    "createdAt": "2019-12-27T18:02:56.391Z",
                    "updatedAt": "2019-12-27T18:02:56.391Z",
                    "__v": 0
                },
                
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
     * @api {post} /api/v1/expenses/createExpense [Api to create expense]
     * @apiVersion 1.0.0
     * @apiGroup expenses
     * 
     * 
     * @apiParam {String} expenseTitle expenseTitle of the expense passed as a body parameter
     * @apiParam {String} expenseDescription expenseDescription of the expense passed as a body parameter
     * @apiParam {String} expenseAmount expenseAmount of the expense passed as a body parameter
     * @apiParam {String} createdBy usserId of the user who created the expense passed as a body parameter
     * @apiParam {String} PaidBy the users who paid for the expense passed as a body parameter
     * @apiParam {String} usersInvolved the users who involved in that expense passed as a body parameter
     * @apiParam {String} authToken of the user passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"New expense Is Created Successfully",
     *   "status":200,
     *   "data":
     *           {
     *              
            "expenseTitle": "ksjhskjfh",
            "expenseDescription": "skfjdkfl",
            "_id": "5e064750f680833f80d85de7",
            "expenseId": "1MpzqViy",
            "groupId": "qD9Nvqqv",
            "expenseAmount": 500,
            "createdBy": {
                "firstName": "Anvesh Reddy",
                "_id": "5df90c4fc8e7ad1124e0b59c"
            },
            "paidBy": [
                {
                    "_id": "5e064750f680833f80d85de8",
                    "user": {
                        "firstName": "giri",
                        "_id": "5e027ad31a8953099ccaee24"
                    },
                    "amountLent": 500
                }
            ],
            "usersInvolved": [
                {
                    "_id": "5e064750f680833f80d85dea",
                    "user": "5df90c4fc8e7ad1124e0b59c",
                    "amountSpent": 250
                },
                {
                    "_id": "5e064750f680833f80d85de9",
                    "user": "5e027ad31a8953099ccaee24",
                    "amountSpent": 250
                }
            ],
            "createdAt": "2019-12-27T18:02:56.391Z",
            "updatedAt": "2019-12-27T18:02:56.391Z",
            "__v": 0
        },
        
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
     * @api {put} /api/v1/expenses/:expenseId/updateExpense [Api to update expense]
     * @apiVersion 1.0.0
     * @apiGroup expenses 
     * 
     * @apiParam {String} authToken of the user passed as a body parameter
     * @apiParam {String} expenseId of the expense passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"expense Is Edited Successfully",
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
     * @api {post} /api/v1/expenses/:expenseId/deleteExpense [Api to delete expense]
     * @apiVersion 1.0.0
     * @apiGroup expenses
     * 
     * 
     * @apiParam {String} authToken of the user passed as a body parameter
     * @apiParam {String} expenseId of the expense passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"expense Is Deleted Successfully",
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