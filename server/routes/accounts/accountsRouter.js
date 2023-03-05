const express = require("express")
const {createAccountControllers,
      getAccountControllers,
      getAccountsControllers,
      deleteAccountControllers,
      updateAccountControllers} = require("../../controllers/accounts/accountsControllers")
      const isLogin = require("../../middlewares/isLogin")

const accountsRouter = express.Router()

//post/api/v1/accounts
accountsRouter.post("/", isLogin, createAccountControllers)
//get/api/v1/accounts/:id
accountsRouter.get("/:id", getAccountControllers)
//delete/api/v1/accounts/:id
accountsRouter.delete("/:id", deleteAccountControllers)
//put/api/v1/accounts/:id
accountsRouter.put("/:id", updateAccountControllers)
//get/api/v1/accounts
accountsRouter.get("/", getAccountsControllers)

module.exports = accountsRouter