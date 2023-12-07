const { Router } = require("express");

const alunosRouter = require("../routes/alunosRoutes.routes");
const escolasRouter = require("../routes/escolasRoutes.routes");
const materiasRouter = require("../routes/materiasRoutes.routes");
const notasRouter = require("../routes/notasRoutes.routes");
const turmasRouter = require("../routes/turmasRoutes.routes");
const relatoriosRouter = require("../routes/relatoriosRoutes.routes");

const routes = Router()

routes.use("/alunos", alunosRouter);
routes.use("/escolas", escolasRouter);
routes.use("/materias", materiasRouter);
routes.use("/notas", notasRouter);
routes.use("/turmas", turmasRouter);
routes.use("/relatorios", relatoriosRouter);

module.exports = routes;