const { Router } = require("express");
const EscolasController = require('../controllers/EscolasController');

const escolasController = new EscolasController;

const escolasRouter = Router();

escolasRouter.post('/', escolasController.create);
// escolasRouter.get('/', escolasController.index);
// escolasRouter.put('/:id', escolasController.update);
// escolasRouter.delete('/:id', escolasController.delete);

module.exports = escolasRouter;