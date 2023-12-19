const { Router } = require("express");
const MateriasController = require('../controllers/MateriasController');

const materiasController = new MateriasController;

const materiasRouter = Router();

materiasRouter.post('/createMateria', materiasController.create);
materiasRouter.get('/listMateria', materiasController.index);
materiasRouter.put('/updateMateria/:materiaId', materiasController.update);
materiasRouter.delete('/deleteMateria/:materiaId', materiasController.delete);

module.exports = materiasRouter;