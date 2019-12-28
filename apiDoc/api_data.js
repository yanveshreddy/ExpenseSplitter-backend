define({ "api": [
  {
    "group": "expenses",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/expenses/:expenseId/details",
    "title": "[Get single expense details].",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>The expenseId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": {\n              \n                  \"expenseTitle\": \"ksjhskjfh\",\n                  \"expenseDescription\": \"skfjdkfl\",\n                  \"_id\": \"5e064750f680833f80d85de7\",\n                  \"expenseId\": \"1MpzqViy\",\n                  \"groupId\": \"qD9Nvqqv\",\n                  \"expenseAmount\": 500,\n                  \"createdBy\": {\n                      \"firstName\": \"Anvesh Reddy\",\n                      \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n                  },\n                  \"paidBy\": [\n                      {\n                          \"_id\": \"5e064750f680833f80d85de8\",\n                          \"user\": {\n                              \"firstName\": \"giri\",\n                              \"_id\": \"5e027ad31a8953099ccaee24\"\n                          },\n                          \"amountLent\": 500\n                      }\n                  ],\n                  \"usersInvolved\": [\n                      {\n                          \"_id\": \"5e064750f680833f80d85dea\",\n                          \"user\": \"5df90c4fc8e7ad1124e0b59c\",\n                          \"amountSpent\": 250\n                      },\n                      {\n                          \"_id\": \"5e064750f680833f80d85de9\",\n                          \"user\": \"5e027ad31a8953099ccaee24\",\n                          \"amountSpent\": 250\n                      }\n                  ],\n                  \"createdAt\": \"2019-12-27T18:02:56.391Z\",\n                  \"updatedAt\": \"2019-12-27T18:02:56.391Z\",\n                  \"__v\": 0\n              },\n    `      }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Error Occured.\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/expenseRoute.js",
    "groupTitle": "expenses",
    "name": "GetApiV1ExpensesExpenseidDetails"
  },
  {
    "group": "expenses",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/expenses/view/all",
    "title": "[Get all expenses].",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   {\n       \"error\": false,\n       \"message\": \"All expenses Found\",\n       \"status\": 200,\n       \"data\": [\n          \t\t\t\t {\n                  \"expenseTitle\": \"ksjhskjfh\",\n                  \"expenseDescription\": \"skfjdkfl\",\n                  \"_id\": \"5e064750f680833f80d85de7\",\n                  \"expenseId\": \"1MpzqViy\",\n                  \"groupId\": \"qD9Nvqqv\",\n                  \"expenseAmount\": 500,\n                  \"createdBy\": {\n                      \"firstName\": \"Anvesh Reddy\",\n                      \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n                  },\n                  \"paidBy\": [\n                      {\n                          \"_id\": \"5e064750f680833f80d85de8\",\n                          \"user\": {\n                              \"firstName\": \"giri\",\n                              \"_id\": \"5e027ad31a8953099ccaee24\"\n                          },\n                          \"amountLent\": 500\n                      }\n                  ],\n                  \"usersInvolved\": [\n                      {\n                          \"_id\": \"5e064750f680833f80d85dea\",\n                          \"user\": \"5df90c4fc8e7ad1124e0b59c\",\n                          \"amountSpent\": 250\n                      },\n                      {\n                          \"_id\": \"5e064750f680833f80d85de9\",\n                          \"user\": \"5e027ad31a8953099ccaee24\",\n                          \"amountSpent\": 250\n                      }\n                  ],\n                  \"createdAt\": \"2019-12-27T18:02:56.391Z\",\n                  \"updatedAt\": \"2019-12-27T18:02:56.391Z\",\n                  \"__v\": 0\n              },\n\t\t]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Find User Details\",\n  \"status\": 500,\n  \"data\": null\n\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/expenseRoute.js",
    "groupTitle": "expenses",
    "name": "GetApiV1ExpensesViewAll"
  },
  {
    "type": "post",
    "url": "/api/v1/expenses/createExpense",
    "title": "[Api to create expense]",
    "version": "1.0.0",
    "group": "expenses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseTitle",
            "description": "<p>expenseTitle of the expense passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseDescription",
            "description": "<p>expenseDescription of the expense passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseAmount",
            "description": "<p>expenseAmount of the expense passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>usserId of the user who created the expense passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "PaidBy",
            "description": "<p>the users who paid for the expense passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "usersInvolved",
            "description": "<p>the users who involved in that expense passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"New expense Is Created Successfully\",\n \"status\":200,\n \"data\":\n         {\n            \n           \"expenseTitle\": \"ksjhskjfh\",\n           \"expenseDescription\": \"skfjdkfl\",\n           \"_id\": \"5e064750f680833f80d85de7\",\n           \"expenseId\": \"1MpzqViy\",\n           \"groupId\": \"qD9Nvqqv\",\n           \"expenseAmount\": 500,\n           \"createdBy\": {\n               \"firstName\": \"Anvesh Reddy\",\n               \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n           },\n           \"paidBy\": [\n               {\n                   \"_id\": \"5e064750f680833f80d85de8\",\n                   \"user\": {\n                       \"firstName\": \"giri\",\n                       \"_id\": \"5e027ad31a8953099ccaee24\"\n                   },\n                   \"amountLent\": 500\n               }\n           ],\n           \"usersInvolved\": [\n               {\n                   \"_id\": \"5e064750f680833f80d85dea\",\n                   \"user\": \"5df90c4fc8e7ad1124e0b59c\",\n                   \"amountSpent\": 250\n               },\n               {\n                   \"_id\": \"5e064750f680833f80d85de9\",\n                   \"user\": \"5e027ad31a8953099ccaee24\",\n                   \"amountSpent\": 250\n               }\n           ],\n           \"createdAt\": \"2019-12-27T18:02:56.391Z\",\n           \"updatedAt\": \"2019-12-27T18:02:56.391Z\",\n           \"__v\": 0\n       },\n          }  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400/500/403,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/expenseRoute.js",
    "groupTitle": "expenses",
    "name": "PostApiV1ExpensesCreateexpense"
  },
  {
    "type": "post",
    "url": "/api/v1/expenses/:expenseId/deleteExpense",
    "title": "[Api to delete expense]",
    "version": "1.0.0",
    "group": "expenses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>of the expense passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"expense Is Deleted Successfully\",\n \"status\":200,\n \"data\": []  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured while deleting\",\n  \"status\":500,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/expenseRoute.js",
    "groupTitle": "expenses",
    "name": "PostApiV1ExpensesExpenseidDeleteexpense"
  },
  {
    "type": "put",
    "url": "/api/v1/expenses/:expenseId/updateExpense",
    "title": "[Api to update expense]",
    "version": "1.0.0",
    "group": "expenses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>of the expense passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"expense Is Edited Successfully\",\n \"status\":200,\n \"data\": [\n            \"n\": 1,\n            \"nModified\": 1,\n             \"ok\": 1\n         ]  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400/500/403,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/expenseRoute.js",
    "groupTitle": "expenses",
    "name": "PutApiV1ExpensesExpenseidUpdateexpense"
  },
  {
    "group": "groups",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/groups/:groupId/details",
    "title": "[Get single user].",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>The groupId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   {\n      \"error\": false,\n      \"message\": \"User Details Found\",\n      \"status\": 200,\n      \"data\": {\n                 \"groupName\": \"GoaTrip\",\n                 \"groupDescription\": \"ajdjsfsfdkgjdk\",\n                 \"users\": [\n                      {\n                          \"firstName\": \"Anvesh Reddy\",\n                          \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n                      },\n                      {\n                          \"firstName\": \"giri\",\n                          \"_id\": \"5e027ad31a8953099ccaee24\"\n                      }\n                  ],\n                  \"_id\": \"5e04804398bff41d443d7111\",\n                  \"groupId\": \"qD9Nvqqv\",\n                  \"createdBy\": {\n                      \"firstName\": \"Anvesh Reddy\",\n                      \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n                  },\n                  \"createdAt\": \"2019-12-26T09:41:23.102Z\",\n                  \"updatedAt\": \"2019-12-26T09:41:23.102Z\",\n                  \"__v\": 0\n    }\n}\n              \n      `      }\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Error Occured.\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/groupRoute.js",
    "groupTitle": "groups",
    "name": "GetApiV1GroupsGroupidDetails"
  },
  {
    "group": "groups",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/groups/:groupId/getAllUsersForAGroup",
    "title": "[Get list of users in a group]",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>The groupId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"User Details Found\",\n   \"status\": 200,\n   \"data\": {\n               \"groupName\": \"GoaTrip\",\n               \"groupDescription\": \"ajdjsfsfdkgjdk\",\n               \"users\": [\n                   {\n                       \"firstName\": \"Anvesh Reddy\",\n                       \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n                   },\n                   {\n                       \"firstName\": \"giri\",\n                       \"_id\": \"5e027ad31a8953099ccaee24\"\n                   }\n               ],\n               \"_id\": \"5e04804398bff41d443d7111\",\n               \"groupId\": \"qD9Nvqqv\",\n               \"createdBy\": {\n                   \"firstName\": \"Anvesh Reddy\",\n                   \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n               },\n               \"createdAt\": \"2019-12-26T09:41:23.102Z\",\n               \"updatedAt\": \"2019-12-26T09:41:23.102Z\",\n                      }  \n          }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/groupRoute.js",
    "groupTitle": "groups",
    "name": "GetApiV1GroupsGroupidGetallusersforagroup"
  },
  {
    "group": "groups",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/groups/:groupId/getAllUsersForAGroup",
    "title": "[Get list of users in a group]",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>The groupId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   {\n      \"error\": false,\n      \"message\": \"User Details Found\",\n      \"status\": 200,\n      \"data\": {\n\"groupName\": \"GoaTrip\",\n        \"groupDescription\": \"ajdjsfsfdkgjdk\",\n        \"users\": [\n            {\n                \"firstName\": \"Anvesh Reddy\",\n                \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n            },\n            {\n                \"firstName\": \"giri\",\n                \"_id\": \"5e027ad31a8953099ccaee24\"\n            }\n        ],\n        \"_id\": \"5e04804398bff41d443d7111\",\n        \"groupId\": \"qD9Nvqqv\",\n        \"createdBy\": {\n            \"firstName\": \"Anvesh Reddy\",\n            \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n        },\n        \"createdAt\": \"2019-12-26T09:41:23.102Z\",\n        \"updatedAt\": \"2019-12-26T09:41:23.102Z\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/groupRoute.js",
    "groupTitle": "groups",
    "name": "GetApiV1GroupsGroupidGetallusersforagroup"
  },
  {
    "group": "groups",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/groups/view/all",
    "title": "[Get all groups].",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {\n         \"error\": false,\n         \"message\": \"All Groups Found\",\n         \"status\": 200,\n         \"data\": [\n\t\t\t\t {\n                  {\n                  \"groupName\": \"GoaTrip\",\n                  \"groupDescription\": \"ajdjsfsfdkgjdk\",\n                  \"users\": [\n                      {\n                          \"firstName\": \"Anvesh Reddy\",\n                          \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n                      },\n                      {\n                          \"firstName\": \"giri\",\n                          \"_id\": \"5e027ad31a8953099ccaee24\"\n                      }\n                  ],\n                  \"_id\": \"5e04804398bff41d443d7111\",\n                  \"groupId\": \"qD9Nvqqv\",\n                  \"createdBy\": {\n                      \"firstName\": \"Anvesh Reddy\",\n                      \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n                  },\n                  \"createdAt\": \"2019-12-26T09:41:23.102Z\",\n                  \"updatedAt\": \"2019-12-26T09:41:23.102Z\",\n           }  \n }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Find User Details\",\n  \"status\": 500,\n  \"data\": null\n\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/groupRoute.js",
    "groupTitle": "groups",
    "name": "GetApiV1GroupsViewAll"
  },
  {
    "type": "post",
    "url": "/api/v1/groups/createGroup",
    "title": "[Api to create group]",
    "version": "1.0.0",
    "group": "groups",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupName",
            "description": "<p>groupName of the group passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupDescription",
            "description": "<p>groupDescription of the group passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "users",
            "description": "<p>users of the group passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>userId of the user who created the group  passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"New group Is Created Successfully\",\n \"status\":200,\n \"data\": {\n                 \"groupName\": \"GoaTrip\",\n                 \"groupDescription\": \"ajdjsfsfdkgjdk\",\n                 \"users\": [\n                     {\n                         \"firstName\": \"Anvesh Reddy\",\n                         \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n                     },\n                     {\n                         \"firstName\": \"giri\",\n                         \"_id\": \"5e027ad31a8953099ccaee24\"\n                     }\n                 ],\n                 \"_id\": \"5e04804398bff41d443d7111\",\n                 \"groupId\": \"qD9Nvqqv\",\n                 \"createdBy\": {\n                     \"firstName\": \"Anvesh Reddy\",\n                     \"_id\": \"5df90c4fc8e7ad1124e0b59c\"\n                 },\n                 \"createdAt\": \"2019-12-26T09:41:23.102Z\",\n                 \"updatedAt\": \"2019-12-26T09:41:23.102Z\",\n          }  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400/500/403,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/groupRoute.js",
    "groupTitle": "groups",
    "name": "PostApiV1GroupsCreategroup"
  },
  {
    "type": "put",
    "url": "/api/v1/groups/:groupId/updateGroup",
    "title": "[Api to update group]",
    "version": "1.0.0",
    "group": "groups",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>of the group passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"group Is Edited Successfully\",\n \"status\":200,\n \"data\": [\n            \"n\": 1,\n            \"nModified\": 1,\n             \"ok\": 1\n         ]  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400/500/403,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/groupRoute.js",
    "groupTitle": "groups",
    "name": "PutApiV1GroupsGroupidUpdategroup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "api to get allusers.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {\n         \"error\": false,\n         \"message\": \"All User Details Found\",\n         \"status\": 200,\n         \"data\": [\n\t\t\t\t {\n                  \"firstName\": \"testuser\",\n                  \"lastName\": \"mp\",\n                  \"isAdmin\": true,\n                  \"email\": \"testusermp04@gmail.com\",\n                  \"countryCode\": \" 91\",\n                  \"userId\": \"Ph5K-Be7\",\n                  \"userName\": \"testuser-admin\",\n                  \"mobileNumber\": 8008434546,\n                  \"createdAt\": \"2019-11-22T18:27:31.135Z\",\n                  \"updatedAt\": \"2019-11-22T20:18:36.230Z\",\n                  \"resetPasswordToken\": \"token\"\n              },\n              {\n                  \"firstName\": \"giri\",\n                  \"lastName\": \"poonati\",\n                 \"isAdmin\": true,\n                  \"email\": \"girippoonati@gmail.com\",\n                  \"resetPasswordToken\": \"token\",\n                  \"countryCode\": \"374\",\n                  \"userId\": \"2g4DtolR\",\n                  \"userName\": \"giri-admin\",\n                  \"mobileNumber\": 7865489655,\n                  \"createdAt\": \"2019-11-22T18:55:23.828Z\",\n                  \"updatedAt\": \"2019-11-22T18:55:23.828Z\"\n              }\n  \t\t]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Find User Details\",\n  \"status\": 500,\n  \"data\": null\n\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "api to generate Reset Token",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"Password Reset Token Sent successfully\",\n \"status\":200,\n \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"lkjyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc\",\n        \"userDetails\": {\n        \"data\": {\n               \"firstName\": \"giri\",\n               \"lastName\": \"poonati\",\n               \"isAdmin\": true,\n                \"email\": \"girippoonati@gmail.com\",\n                \"resetPasswordToken\": \"token\",\n                \"countryCode\": \"374\",\n                \"userId\": \"2g4DtolR\",\n                \"userName\": \"giri-admin\",\n                \"mobileNumber\": 7865489655,\n                \"createdAt\": \"2019-11-22T18:55:23.828Z\",\n                \"updatedAt\": \"2019-11-22T18:55:23.828Z\"\n            \n    `      }\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Login User\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetPassword",
    "title": "api to reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resetPasswordToken",
            "description": "<p>of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"Your Password Is Reset Successfully\",\n   \"status\": 200,\n   \"data\": {\n              \"firstName\": \"Anvesh Reddy\",\n              \"lastName\": \"Yedavelly\",\n              \"isAdmin\": false,\n              \"email\": \"vc16anvesh@gmail.com\",\n              \"countryCode\": \" 91\",\n              \"userId\": \"ERE32e8s\",\n              \"userName\": \"anvesh-004\",\n              \"mobileNumber\": 8008434433,\n              \"createdAt\": \"2019-11-21T15:19:01.470Z\",\n              \"updatedAt\": \"2019-11-27T16:34:46.683Z\",\n           }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Login User\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>countryCode for the mobile number of user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "password",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"User created\",\n \"status\": 200,\n \"data\": {\n               \"firstName\": \"giri\",\n               \"lastName\": \"poonati\",\n               \"isAdmin\": true,\n                \"email\": \"girippoonati@gmail.com\",\n                \"resetPasswordToken\": \"token\",\n                \"countryCode\": \"374\",\n                \"userId\": \"2g4DtolR\",\n                \"userName\": \"giri-admin\",\n                \"mobileNumber\": 7865489655,\n                \"createdAt\": \"2019-11-22T18:55:23.828Z\",\n                \"updatedAt\": \"2019-11-22T18:55:23.828Z\"\n            \n    `      }\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\": true,\n  \"message\": \"Failed To create User\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/details",
    "title": "[Get single user].",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": {\n               \"firstName\": \"giri\",\n               \"lastName\": \"poonati\",\n               \"isAdmin\": true,\n                \"email\": \"girippoonati@gmail.com\",\n                \"resetPasswordToken\": \"token\",\n                \"countryCode\": \"374\",\n                \"userId\": \"2g4DtolR\",\n                \"userName\": \"giri-admin\",\n                \"mobileNumber\": 7865489655,\n                \"createdAt\": \"2019-11-22T18:55:23.828Z\",\n                \"updatedAt\": \"2019-11-22T18:55:23.828Z\"\n            \n    `      }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Error Occured.\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUseridDetails"
  }
] });
