const swaggerAutogen = require("swagger-autogen")();
const path = require("path");

const output = "./swagger_doc.json";
const AdmController = path.join(__dirname, "src/controllers/AdmController.js");
const AlunosController= path.join(__dirname, "src/controllers/AlunosController.js");
const EscolasController= path.join(__dirname, "src/controllers/EscolasController.js");
const LoginController= path.join(__dirname, "src/controllers/LoginController.js");
const MateriasController= path.join(__dirname, "src/controllers/MateriasController.js");
const NotasController= path.join(__dirname, "src/controllers/NotasController.js");
const RelatoriosController= path.join(__dirname, "src/controllers/RelatoriosController.js");
const TurmasController= path.join(__dirname, "src/controllers/TurmasController.js");
const UserController= path.join(__dirname, "src/controllers/UserController.js");

const admRoutes= path.join(__dirname, "src/routes/admRoutes.js");
const alunosRoutes= path.join(__dirname, "src/routes/alunosRoutes.routes.js");
const escolasRoutes= path.join(__dirname, "src/routes/escolasRoutes.routes.js");
const index= path.join(__dirname, "src/routes/index.js");
const loginRoutes= path.join(__dirname, "src/routes/loginRoutes.js");
const materiasRoutes = path.join(__dirname, "src/routes/materiasRoutes.routes.js");
const notasRoutes = path.join(__dirname, "src/routes/notasRoutes.routes.js");
const relatorioRoutes = path.join(__dirname, "src/routes/relatoriosRoutes.routes.js");
const turmasRoutes = path.join(__dirname, "src/routes/turmasRoutes.routes.js");
const userRoutes = path.join(__dirname, "src/routes/userRoutes.js");

const endpoints = [AdmController, AlunosController, EscolasController, LoginController,
                    MateriasController, NotasController, RelatoriosController, TurmasController,
                    UserController, admRoutes, alunosRoutes, escolasRoutes, index, loginRoutes,
                    materiasRoutes, notasRoutes, relatorioRoutes, turmasRoutes, userRoutes];

swaggerAutogen(output, endpoints);
