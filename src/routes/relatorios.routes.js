const { Router } = require("express");
const RelatoriosController = require('../controllers/RelatoriosController');

const relatoriosController = new RelatoriosController;

const relatoriosRouter = Router();

relatoriosRouter.get('/medias/aluno', relatoriosController.mediaAluno);
relatoriosRouter.get('/medias/alunoPeriodo', relatoriosController.mediaAluno);

module.exports = relatoriosRouter;