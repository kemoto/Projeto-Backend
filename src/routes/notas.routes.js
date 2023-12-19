const { Router } = require("express");
const NotasController = require('../controllers/NotasController');

const notasController = new NotasController;

const notasRouter = Router();

notasRouter.post('/createNota', notasController.create);
notasRouter.get('/listNota', notasController.index);
notasRouter.put('/updateNota/:id', notasController.update);
notasRouter.delete('/deleteNota/:id', notasController.delete);

module.exports = notasRouter;