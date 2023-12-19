const { Router } = require("express");

const Auth = require("../utils/Auth");
const auth = new Auth;

const alunosRouter = require("./alunos.routes");
const escolasRouter = require("./escolas.routes");
const materiasRouter = require("./materias.routes");
const notasRouter = require("./notas.routes");
const turmasRouter = require("./turmas.routes");
const relatoriosRouter = require("./relatorios.routes");
const installBD = require("../routes/installBD.routes");
const usuarioRouter = require("./usuarios.routes");
const admRouter = require("./adm.routes");

const routes = Router()

routes.use("/alunos", auth.validaAcesso, alunosRouter);
routes.use("/escolas", auth.validaAcesso, escolasRouter);
routes.use("/materias", auth.validaAcesso, materiasRouter);
routes.use("/notas", auth.validaAcesso, notasRouter);
routes.use("/turmas", auth.validaAcesso, turmasRouter);
routes.use("/relatorios", auth.validaAcesso, relatoriosRouter);
routes.use("/install", installBD);
routes.use("/usuarios", usuarioRouter);
routes.use("/adm", auth.validaAcesso, admRouter);

module.exports = routes;