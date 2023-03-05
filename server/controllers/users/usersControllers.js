const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const { AppErr, appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
//Register
const registerUsersControllers = async (req, res, next) => {
  const { fullname, password, email } = req.body;
  try {
    //Chequea si el correo existe
    const userFound = await User.findOne({ email });
    if (userFound) {
      next(appErr("El usuario ya existe", 400));
    }
    //Chequea si hay alguna fila son las correctas
    if (!email || !password || !fullname) {
      next(new Error("Por favor llenar todas las filas"));
    }
    //encriptar la password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Creacion del usuario
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//Login
loginUsersControllers = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //chequear si el email existe
    const userFound = await User.findOne({ email });
    if (!userFound)
      return next(appErr("El email o password son incorrecto", 400));
    //chequear si la password es valido
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(new AppErr("El password es incorrecto", 400));
    }

    res.json({
      status: "Success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//Profile
profileUsersControllers = async (req, res, next) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    res.json(user);
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//Delete
deleteUsersControllers = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user)
    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//Update
updateUsersControllers = async (req, res, next) => {
  try {
    //1. Comprobar si existe el correo electronico
    if (req.body.email) {
      const userFound = await User.findById({ email: req.body.email });
      if (!userFound) return next(new AppErr("El correo, ya esta tomado", 400));
    }
    //2. Comprobar si el usuario esta actualizado la contraseña
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //3. El usuario esta sido actualizado
      const user = await User.findByIdAndUpdate(
        req.user,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      //4. Enviar la respuesta del servidor
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }

    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    //5. Enviar la respuesta del servidor
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  registerUsersControllers,
  loginUsersControllers,
  profileUsersControllers,
  deleteUsersControllers,
  updateUsersControllers,
};
