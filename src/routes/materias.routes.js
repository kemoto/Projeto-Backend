const { Router } = require("express");
const MateriasController = require('../controllers/MateriasController');

const materiasController = new MateriasController;

const materiasRouter = Router();

materiasRouter.post('/', materiasController.create);
materiasRouter.get('/', materiasController.index);
materiasRouter.put('/:materiaId', materiasController.update);
materiasRouter.delete('/:materiaId', materiasController.delete);

module.exports = materiasRouter;