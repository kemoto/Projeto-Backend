const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { UsersModel } = require("../database/sequelize");
const AppError = require("../utils/AppError");

class UserController {
  async create(req, res) {
    const { usuario, senha, isAdmin = false } = req.body;

    if (!usuario || !senha) {
      throw new AppError("Todos os campos precisam ser preenchidos.");
    }

    const verificarUsuario = await UsersModel.findOne({ where: { usuario } });

    if (verificarUsuario) {
      throw new AppError("Usuário já cadastrado");
    }

    const hashedSenha = await hash(senha, 8);

    try {
      await UsersModel.create({
        usuario,
        senha: hashedSenha,
        isAdmin,
      });

      res.json("Usuário criado com sucesso.");
    } catch (e) {
      console.log(e);

      res.json("Ocorreu um erro durante a criação do usuário.");
    }
  }

  async login(req, res) {
    const { usuario, senha } = req.body;

    const verificarUsuario = await UsersModel.findOne({ where: { usuario } });

    const verificaSenha = await compare(senha, verificarUsuario.senha);

    if (verificaSenha) {
      const token = jwt.sign({ usuario: usuario }, "!123!", {
        expiresIn: "60 min",
      });

      res.json({ logged: true, token: token });
    } else {
      res.json({ logged: false }, "As credenciais não conferem.");
    }
  }
}

module.exports = UserController;
