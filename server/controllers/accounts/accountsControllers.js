const Account = require("../../model/Account");
const User = require("../../model/User");
const { AppErr } = require("../../utils/appErr");
//create
const createAccountControllers = async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body;
  try {
    //1. Busca o verifica si el usuario, ya es logeado.
    const userFound = await User.findById(req.user);
    if (!userFound)
      return next(
        new AppErr("Esta cuenta de usuario no se ha encontrada", 404)
      );
    //2. Crea la cuenta de ahorro del usuario
    const account = await Account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createBy: req.user,
    });
    //3. Introduce la nueva cuenta de ahorro o la cuenta en los campos de las cuentas del los usuarios
    userFound.accounts.push(account._id);
    //4. Volver a guardar el usuario
    await userFound.save();
    res.json({ status: "success", data: account });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//all
const getAccountsControllers = async (req, res, next) => {
  try {
    //1. Busca todas las cuentas de ahorro que se ha registrados por los usuarios
    const accounts = await Account.find().populate("transactions");
    res.json({ accounts });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//single
const getAccountControllers = async (req, res, next) => {
  try {
    //1. Busca el id con su parametro para encontrar una cuenta de ahorro en particular
    const { id } = req.params;
    const account = await Account.findById(id).populate("transactions");
    res.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//delete
const deleteAccountControllers = async (req, res, next) => {
  try {
  //1. Buscar el id de la cuenta de ahorro para poder eliminar las cuentas
    const {id} = req.params
    await Account.findByIdAndDelete(id)
    res.status(200).json({status: "success", data: null});
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//update
const updateAccountControllers = async (req, res, next) => {
  try {
  //1. Buscar el id de la cuenta de ahorro para poder realozar las modificaciones
  const {id} = req.params
  const account = await Account.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })   
    res.json({
      status: 'success',
      data: account
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createAccountControllers,
  getAccountControllers,
  getAccountsControllers,
  deleteAccountControllers,
  updateAccountControllers,
};
