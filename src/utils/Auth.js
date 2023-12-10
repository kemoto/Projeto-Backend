const jwt = require("jsonwebtoken");
const { UsersModel } = require("../database/sequelize");

async function criarAdministradorPadrao() {
  const usuarioExistente = await UsersModel.findOne({
    where: { usuario: "admin" },
  });

  if (!usuarioExistente) {
    await UsersModel.create({
      usuario: "admin",
      senha: "senhaAdmin",
      isAdmin: true,
    });
    
    console.log("Administrador padrão criado com sucesso.");
  } else {
    console.log("Administrador padrão já existe.");
  }
}

function validaToken(jwtToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(jwtToken, "segredo", (err, obj) => {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
}

function validaAcesso(req, res, next) {
  try {
    const beartoken = req.headers["authorization"] || "";
    const token = beartoken.split(" ");

    if (token[0] !== "Bearer" || !token[1]) {
      throw new AppError("Formato de token inválido", 403);
    }

    const jwtToken = token[1];

    validaToken(jwtToken)
      .then((obj) => {
        req.usuarioAutenticado = obj;
        next();
      })
      .catch((err) => {
        throw new AppError("Token inválido", 403);
      });
  } catch (error) {
    console.error("Erro ao validar o acesso:", error);
    res
      .status(error.status || 500)
      .json({ mensagem: error.message || "Erro interno do servidor." });
  }
}

module.exports = {
  criarAdministradorPadrao,
  validaAcesso,
};
