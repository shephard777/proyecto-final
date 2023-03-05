const express = require("express")
const {registerUsersControllers,
      loginUsersControllers,
      profileUsersControllers,
      deleteUsersControllers,
      updateUsersControllers,} = require("../../controllers/users/usersControllers");
const isLogin = require("../../middlewares/isLogin");
const usersRouter = express.Router();

//post/api/v1/users/register
usersRouter.post("/register", registerUsersControllers)
//post/api/v1/users/login
usersRouter.post("/login", loginUsersControllers)

//get/api/v1/users/profile
usersRouter.get("/profile/", isLogin,  profileUsersControllers)

//delete/api/v1/users/
usersRouter.delete("/", isLogin,  deleteUsersControllers)
  
//put/api/v1/users/
usersRouter.put("/", isLogin, updateUsersControllers)
module.exports = usersRouter