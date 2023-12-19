const { Router } = require("express");
const UserController = require("../controllers/UsuariosController");

const userController = new UserController();

const userRouter = Router();

userRouter.post("/createUser", userController.create);
userRouter.post("/login", userController.login);

module.exports = userRouter;
