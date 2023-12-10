const { Router } = require("express");
const EscolasController = require('../controllers/EscolasController');

const escolasController = new EscolasController;

const escolasRouter = Router();

escolasRouter.post('/', escolasController.create);
escolasRouter.get('/:escolaId', escolasController.show);
escolasRouter.get('/', escolasController.index);
escolasRouter.put('/:escolaId', escolasController.update);
escolasRouter.delete('/:escolaId', escolasController.delete);

module.exports = escolasRouter;