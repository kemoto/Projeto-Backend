require("express-async-errors");
const express = require("express");
const AppError = require("./utils/AppError");
const routes = require("./routes");
const LoginRouter = require("./routes/loginRoutes");
const adminRoutes = require('./routes/admRoutes');
const Auth = require("./utils/Auth");
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Middleware para criar administrador padrão
Auth.criarAdministradorPadrao()
  .then(() => {})
  .catch((error) => {
    console.error("Erro ao criar administrador padrão:", error);
    process.exit(1);
  });

app.use(routes);

app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.status).json({
      status: "error",
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

// Rotas
app.use("/", LoginRouter);
app.use('/users', userRoutes);
app.use("/admin", adminRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
