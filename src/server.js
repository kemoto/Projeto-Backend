require("express-async-errors");
const express = require("express");
const AppError = require("./utils/AppError");
const routes = require("./routes");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_doc.json");

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
