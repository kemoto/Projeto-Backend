const jwt = require("jsonwebtoken");
const { UsersModel } = require("../database/sequelize");

async function login(req, res) {
  try {
    const { usuario, senha } = req.body;

    // Busca o usuário no banco de dados
    let usuarioAutenticado = await UsersModel.findOne({ where: { id } });

    // Se o usuário não existir, cria um novo usuário
    if (!usuarioAutenticado) {
      await UsersModel.create({ usuario, senha });

      // Busca novamente o usuário recém-criado
      usuarioAutenticado = await UsersModel.findOne({ where: { usuario } });
    }

    if (senha !== usuarioAutenticado.senha) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    // Gera um token JWT
    const token = jwt.sign(
      {
        id: usuarioAutenticado.id,
        usuario: usuarioAutenticado.usuario,
        senha: usuarioAutenticado.senha,
        isAdmin: usuarioAutenticado.isAdmin,
      },
      "segredo",
      {
        expiresIn: "1h",
      }
    );

    return res.json({ logged: true, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = { login };
