const Account = require("../../model/Account");
const User = require("../../model/User");
const Transaction = require("../../model/Transaction");
const { AppErr } = require("../../utils/appErr");

//create
const createTransactionControllers = async (req, res, next) => {
  const { name, amount, notes, transactionType, account, category } = req.body;
  try {
    //1. Buscar el usuario
    const userFound = await User.findById(req.user);
    if (!userFound)
      return next(
        new AppErr("Esta cuenta de usuario no se ha encontrada", 404)
      );
    //2. Buscar la cuenta de ahorro del usuario
    const accountFound = await Account.findById(account);
    if (!accountFound)
      return next(
        new AppErr("Esta cuenta de ahorro no se ha encuentrado", 404)
      );
    //3. Se crea la transacción que realiza el usuario
    const transaction = await Transaction.create({
      amount,
      notes,
      account,
      transactionType,
      category,
      name,
      createBy: req.user,
    });
    //4. Se realiza la transferencia de la transacción hacia la cuenta de ahorro
    accountFound.transactions.push(transaction._id);
    //5. Guarda la cuenta de ahorro con la transacción realizada
    await accountFound.save();
    res.json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//single
const getTransactionsControllers = async (req, res, next) => {
  try {
    //1.Busca todas las transacciones que ha sido realizada por el usuario
    const {id} = req.params
    const transactions = await Transaction.findById(id);
    res.status(200).json({
      status: "success",
      data: transactions,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//all
const getTransactionControllers = async (req, res, next) => {
  try {
    //1. Busca la transacción realizada a traves del ID de la transacción
    const transaction = await Transaction.find()
    res.status(200).json({
      status: 'success',
      data: transaction
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//delete
const deleteTransactionControllers = async (req, res, next) => {
  try {
    //1. Busca el ID de la transacción para que asi pueda ser eliminado
    const {id} = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//update
const updateTransactionControllers = async (req, res, next) => {
  try {
    //1. Busca el ID de la transacción para poder modificar su contenido y poder realizar las modificaciones que el usuario necesite
    const {id} = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'success',
      data: transaction
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createTransactionControllers,
  getTransactionsControllers,
  getTransactionControllers,
  deleteTransactionControllers,
  updateTransactionControllers,
};
