const { Router } = require("express");
const AlunosController = require('../controllers/AlunosController');

const alunosController = new AlunosController;

const alunosRouter = Router();

alunosRouter.post('/', alunosController.create);
// alunosRouter.get('/', alunosController.index);
// alunosRouter.put('/:id', alunosController.update);
// alunosRouter.delete('/:id', alunosController.delete);

module.exports = alunosRouter;