const { Router } = require("express");
const NotasController = require('../controllers/NotasController');

const notasController = new NotasController;

const notasRouter = Router();

notasRouter.post('/', notasController.create);
// notasRouter.get('/', notasController.index);
// notasRouter.put('/:id', notasController.update);
// notasRouter.delete('/:id', notasController.delete);

module.exports = notasRouter;