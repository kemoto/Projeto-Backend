const { Router } = require("express");

const alunosRouter = require("./alunos.routes");
const escolasRouter = require("./escolas.routes");
const materiasRouter = require("./materias.routes");
const notasRouter = require("./notas.routes");
const turmasRouter = require("./turmas.routes");
const relatoriosRouter = require("./relatorios.routes");
const installBD = require("../routes/installBD.routes");

const routes = Router()

routes.use("/alunos", alunosRouter);
routes.use("/escolas", escolasRouter);
routes.use("/materias", materiasRouter);
routes.use("/notas", notasRouter);
routes.use("/turmas", turmasRouter);
routes.use("/relatorios", relatoriosRouter);
routes.use("/install", installBD);

module.exports = routes;