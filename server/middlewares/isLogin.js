const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");
const { AppErr } = require("../utils/appErr");

const isLogin = (req, res, next) => {
  //get es el token que de la solicitud del frontend y header
  const token = getTokenFromHeader(req);
  //Verifica el token
  const decodeUser = verifyToken(token);
  //Salva el token del usuario que se genera al obtener obj
  req.user = decodeUser.id;
  if (!decodeUser) {
    return next(
      new AppErr(
        "El token es invalido o el tiempo ha expirado, Por favor vuelva a iniciar sesion",
        401
      )
    );
  }
  next();
};

module.exports = isLogin;
