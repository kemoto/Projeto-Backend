const swaggerAutogen = require("swagger-autogen")();
const path = require("path");

const output = "./swagger_doc.json";
const install = path.join(__dirname, "/src/routes/installBD.routes.js");
const admRoutes = path.join(__dirname, "/src/routes/adm.routes.js");
const alunosRoutes = path.join(__dirname, "/src/routes/alunos.routes.js");
const escolasRoutes = path.join(__dirname, "/src/routes/escolas.routes.js");
const usuariosRoutes = path.join(__dirname, "/src/routes/usuarios.routes.js");
const materiasRoutes = path.join(__dirname, "/src/routes/materias.routes.js");
const notasRoutes = path.join(__dirname, "/src/routes/notas.routes.js");
const relatorioRoutes = path.join(__dirname, "/src/routes/relatorios.routes.js");
const turmasRoutes = path.join(__dirname, "/src/routes/turmas.routes.js");

const endpoints = [
  install,
  admRoutes,
  alunosRoutes,
  escolasRoutes,
  usuariosRoutes,
  materiasRoutes,
  notasRoutes,
  relatorioRoutes,
  turmasRoutes,
];

const doc = {
  info: {
    version: "1.0.0",
    title: "REST API",
    description: "",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  paths: {},
};

swaggerAutogen(output, endpoints, doc);