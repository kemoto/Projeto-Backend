const { Router } = require("express");
const AlunosController = require('../controllers/AlunosController');

const alunosController = new AlunosController;

const alunosRouter = Router();

alunosRouter.post('/', alunosController.create);
alunosRouter.get('/:alunoId', alunosController.show);
alunosRouter.get('/', alunosController.index);
alunosRouter.put('/:alunoId', alunosController.update);
alunosRouter.delete('/:alunoId', alunosController.delete);

module.exports = alunosRouter;