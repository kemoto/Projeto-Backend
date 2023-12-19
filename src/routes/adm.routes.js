const { Router } = require("express");
const AdmController = require("../controllers/AdmController");

const admController = new AdmController;

const admRouter = Router();

admRouter.post("/", admController.createAdmin);
admRouter.delete("/", admController.deleteUser);

module.exports = admRouter;