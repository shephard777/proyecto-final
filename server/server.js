const express = require("express");
const cors = require("cors");
require("./config/dbConnect")
const accountsRouter = require("./routes/accounts/accountsRouter");
const transactionsRouter = require("./routes/transactions/transactionsRouter");
const usersRouter = require("./routes/users/usersRouter");
const globalErrHandler = require('./middlewares/globalErrHandler')
const {AppErr, appErr} = require("./utils/appErr")
const app = express();

//!middlewares
app.use(express.json());
//?corse middlewares
app.use(cors());
//pass incoming data
//?routes
//usuario router
app.use("/api/v1/users", usersRouter)
//cuenta router
app.use("/api/v1/accounts", accountsRouter)
//transacciones router
app.use("/api/v1/transactions", transactionsRouter)

//*error handlers
app.use(globalErrHandler);
//!listen to server
const PORT = process.env.PORT || 9099;
app.listen(PORT, console.log(`Servidor esta encendido en el puerto ${PORT}`));
