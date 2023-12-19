const { Router } = require("express");
const AlunosController = require('../controllers/AlunosController');

const alunosController = new AlunosController;

const alunosRouter = Router();

alunosRouter.post('/createAluno', alunosController.create);
alunosRouter.get('/showAluno/:alunoId', alunosController.show);
alunosRouter.get('/listAluno', alunosController.index);
alunosRouter.put('/updateAluno/:alunoId', alunosController.update);
alunosRouter.delete('/deleteAluno/:alunoId', alunosController.delete);

module.exports = alunosRouter;