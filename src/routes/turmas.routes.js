const { Router } = require("express");
const TurmasController = require('../controllers/TurmasController');

const turmasController = new TurmasController;

const turmasRouter = Router();

turmasRouter.post('/createTurma', turmasController.create);
turmasRouter.get('/listTurma', turmasController.index);
turmasRouter.put('/updateTurma/:id', turmasController.update);
turmasRouter.delete('/deleteTurma/:id', turmasController.delete);

module.exports = turmasRouter;