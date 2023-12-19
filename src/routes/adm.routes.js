const { Router } = require("express");
const AdmController = require("../controllers/AdmController");

const admController = new AdmController;

const admRouter = Router();

admRouter.post("/createAdm", admController.createAdmin);
admRouter.delete("/deleteUser", admController.deleteUser);
admRouter.put("/updateUser", admController.alteraSenha);

module.exports = admRouter;