const AppError = require("../utils/AppError");
const { UsersModel } = require("../database/sequelize");
const { hash, compare } = require("bcryptjs");

class AdmController {
  async createAdmin(req, res) {
    const { usuario, senha, isAdmin = true } = req.body;

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

  async deleteUser(req, res) {
    const { usuario } = req.body;

    if (!usuario) {
      throw new AppError("É preciso informar o usuario.");
    }

    const verificaUsuario = await UsersModel.findOne({ where: { usuario } });

    if (!verificaUsuario) {
      throw new AppError("Usuário não encontrado.");
    }

    if (verificaUsuario.isAdmin) {
      throw new AppError("Não é possível excluir um admin.");
    }

    await UsersModel.destroy({ where: { usuario } });

    res.json("Usuário deletado com sucesso.");
  }

  async alteraSenha(req, res) {
    const { usuario, senha, novaSenha } = req.body;

    const user = await UsersModel.findOne({ where: { usuario } });

    const validaSenha = await compare(senha, user.senha);

    if (!validaSenha) {
      throw new AppError("O login ou a senha não estão corretos.");
    }

    UsersModel.update({ senha: novaSenha }, { where: usuario });

    res.json("Usuário atualizado com sucesso.");
  }
}

module.exports = AdmController;
