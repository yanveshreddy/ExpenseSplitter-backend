const express = require('express');
//const router = express.Router();
const groupController = require("../controllers/groupController");
const appConfig = require("../../config/appConfig")
const auth = require('../middlewares/auth');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/groups`;

    app.get(`${baseUrl}/view/all`,auth.isAuthorized, groupController.getAllGroups);

    /**
	 * @apiGroup groups
     * @apiVersion  1.0.0
     * @api {get} /api/v1/groups/view/all  [Get all groups].
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *      {
	 *          "error": false,
     *          "message": "All Groups Found",
     *          "status": 200,
     *          "data": [
	 *				 {
     *                   {
                  "groupName": "GoaTrip",
                  "groupDescription": "ajdjsfsfdkgjdk",
                  "users": [
                      {
                          "firstName": "Anvesh Reddy",
                          "_id": "5df90c4fc8e7ad1124e0b59c"
                      },
                      {
                          "firstName": "giri",
                          "_id": "5e027ad31a8953099ccaee24"
                      }
                  ],
                  "_id": "5e04804398bff41d443d7111",
                  "groupId": "qD9Nvqqv",
                  "createdBy": {
                      "firstName": "Anvesh Reddy",
                      "_id": "5df90c4fc8e7ad1124e0b59c"
                  },
                  "createdAt": "2019-12-26T09:41:23.102Z",
                  "updatedAt": "2019-12-26T09:41:23.102Z",
              *            }  
            *  }
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
app.get(`${baseUrl}/getAllGroupsForaUser`,auth.isAuthorized,groupController.getAllGroupsForaUser);
/**
  * @apiGroup groups
  * @apiVersion  1.0.0
  * @api {get} /api/v1/groups/:groupId/getAllUsersForAGroup [Get list of users in a group]
  * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
  * @apiParam {String} groupId The groupId should be passed as the URL parameter
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
                  "groupName": "GoaTrip",
                  "groupDescription": "ajdjsfsfdkgjdk",
                  "users": [
                      {
                          "firstName": "Anvesh Reddy",
                          "_id": "5df90c4fc8e7ad1124e0b59c"
                      },
                      {
                          "firstName": "giri",
                          "_id": "5e027ad31a8953099ccaee24"
                      }
                  ],
                  "_id": "5e04804398bff41d443d7111",
                  "groupId": "qD9Nvqqv",
                  "createdBy": {
                      "firstName": "Anvesh Reddy",
                      "_id": "5df90c4fc8e7ad1124e0b59c"
                  },
                  "createdAt": "2019-12-26T09:41:23.102Z",
                  "updatedAt": "2019-12-26T09:41:23.102Z",
                         }  
             }
     *    
 */
   // params: groupId.
  app.get(`${baseUrl}/getAllUsersForAGroup`,auth.isAuthorized,groupController.getAllUsersForAGroup);
   /**
     * @apiGroup groups
     * @apiVersion  1.0.0
     * @api {get} /api/v1/groups/:groupId/getAllUsersForAGroup [Get list of users in a group]
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	   * @apiParam {String} groupId The groupId should be passed as the URL parameter
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
     * "groupName": "GoaTrip",
        "groupDescription": "ajdjsfsfdkgjdk",
        "users": [
            {
                "firstName": "Anvesh Reddy",
                "_id": "5df90c4fc8e7ad1124e0b59c"
            },
            {
                "firstName": "giri",
                "_id": "5e027ad31a8953099ccaee24"
            }
        ],
        "_id": "5e04804398bff41d443d7111",
        "groupId": "qD9Nvqqv",
        "createdBy": {
            "firstName": "Anvesh Reddy",
            "_id": "5df90c4fc8e7ad1124e0b59c"
        },
        "createdAt": "2019-12-26T09:41:23.102Z",
        "updatedAt": "2019-12-26T09:41:23.102Z",
        "__v": 0
    }
}
    */
     // params: groupId.
  app.get(`${baseUrl}/getSingleGroupDetails`,auth.isAuthorized,groupController.getSingleGroupDetails);
    /**
     * @apiGroup groups
     * @apiVersion  1.0.0
     * @api {get} /api/v1/groups/:groupId/details [Get single user].
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	   * @apiParam {String} groupId The groupId should be passed as the URL parameter
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
     *                  "groupName": "GoaTrip",
                 "groupDescription": "ajdjsfsfdkgjdk",
                 "users": [
                      {
                          "firstName": "Anvesh Reddy",
                          "_id": "5df90c4fc8e7ad1124e0b59c"
                      },
                      {
                          "firstName": "giri",
                          "_id": "5e027ad31a8953099ccaee24"
                      }
                  ],
                  "_id": "5e04804398bff41d443d7111",
                  "groupId": "qD9Nvqqv",
                  "createdBy": {
                      "firstName": "Anvesh Reddy",
                      "_id": "5df90c4fc8e7ad1124e0b59c"
                  },
                  "createdAt": "2019-12-26T09:41:23.102Z",
                  "updatedAt": "2019-12-26T09:41:23.102Z",
                  "__v": 0
    }
}
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

    app.post(`${baseUrl}/createGroup`,auth.isAuthorized,groupController.createGroup);

    /**
     * @api {post} /api/v1/groups/createGroup [Api to create group]
     * @apiVersion 1.0.0
     * @apiGroup groups
     * 
     * 
     * @apiParam {String} groupName groupName of the group passed as a body parameter
     * @apiParam {String} groupDescription groupDescription of the group passed as a body parameter
     * @apiParam {String} users users of the group passed as a body parameter
     * @apiParam {String} createdBy userId of the user who created the group  passed as a body parameter

     * @apiParam {String} authToken of the user passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"New group Is Created Successfully",
     *   "status":200,
     *   "data": {
                  "groupName": "GoaTrip",
                  "groupDescription": "ajdjsfsfdkgjdk",
                  "users": [
                      {
                          "firstName": "Anvesh Reddy",
                          "_id": "5df90c4fc8e7ad1124e0b59c"
                      },
                      {
                          "firstName": "giri",
                          "_id": "5e027ad31a8953099ccaee24"
                      }
                  ],
                  "_id": "5e04804398bff41d443d7111",
                  "groupId": "qD9Nvqqv",
                  "createdBy": {
                      "firstName": "Anvesh Reddy",
                      "_id": "5df90c4fc8e7ad1124e0b59c"
                  },
                  "createdAt": "2019-12-26T09:41:23.102Z",
                  "updatedAt": "2019-12-26T09:41:23.102Z",
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


    app.put(`${baseUrl}/:groupId/updateGroup`,auth.isAuthorized,groupController.updateGroup);
     /**
     * @api {put} /api/v1/groups/:groupId/updateGroup [Api to update group]
     * @apiVersion 1.0.0
     * @apiGroup groups 
     * 
     * @apiParam {String} authToken of the user passed as a body parameter
     * @apiParam {String} groupId of the group passed as a body parameter
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

   
}