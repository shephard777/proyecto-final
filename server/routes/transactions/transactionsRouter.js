const express = require("express");
const {createTransactionControllers,
        getTransactionControllers,
        getTransactionsControllers,
        deleteTransactionControllers,
        updateTransactionControllers} = require("../../controllers/transactions/transactionsControllers")
        const isLogin = require("../../middlewares/isLogin")
const transactionsRouter = express.Router()

//post/api/v1/transactions
transactionsRouter.post("/", isLogin,  createTransactionControllers)
//get/api/v1/transactions/:id
transactionsRouter.get("/:id", getTransactionsControllers)
//delete/api/v1/transactions/:id
transactionsRouter.delete("/:id", deleteTransactionControllers)
//put/api/v1/transactions/:id
transactionsRouter.put("/:id", updateTransactionControllers)
//get/api/v1/transactions
transactionsRouter.get("/", getTransactionControllers)

module.exports = transactionsRouter