const { Router } = require("express");
const EscolasController = require('../controllers/EscolasController');

const escolasController = new EscolasController;

const escolasRouter = Router();

escolasRouter.post('/createEscola', escolasController.create);
escolasRouter.get('/showEscola/:escolaId', escolasController.show);
escolasRouter.get('/listEscola', escolasController.index);
escolasRouter.put('/updateEscola/:escolaId', escolasController.update);
escolasRouter.delete('/deleteEscola/:escolaId', escolasController.delete);

module.exports = escolasRouter;