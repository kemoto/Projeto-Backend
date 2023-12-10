const { UsersModel } = require("../database/sequelize");
const AppError = require("../utils/AppError");

class AdmController {
  async criarAdministrador(req, res) {
    try {
      // Verifique se o usuário atual tem permissão de administrador
      const { isAdmin } = req.usuarioAutenticado;
      if (!isAdmin) {
        throw new AppError(
          "Apenas administradores podem criar outros administradores.",
          403
        );
      }

      // Lógica para criar um novo administrador
      const { usuario, senha } = req.body;
      // Certifique-se de adicionar lógica para verificar se o usuário já existe, gerar senha segura, etc.

      await UsersModel.create({
        usuario,
        senha,
        isAdmin: true,
      });

      res.status(201).json({ mensagem: "Administrador criado com sucesso." });
    } catch (error) {
      console.error(error);
      res
        .status(error.status || 500)
        .json({ mensagem: error.message || "Erro interno do servidor." });
    }
  }

  async excluirUsuario(req, res) {
    try {
      const { id } = req.params;

      // Exclui o usuário pelo ID
      const deletedRows = await UsersModel.destroy({
        where: { id },
      });

      if (deletedRows === 0) {
        throw new AppError("Usuário não encontrado.", 404);
      }

      res.json({ mensagem: "Usuário excluído com sucesso." });
    } catch (error) {
      console.error(error);
      res
        .status(error.status || 500)
        .json({ mensagem: error.message || "Erro interno do servidor." });
    }
  }

  async alterarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { usuario, senha, isAdmin } = req.body;

      // Atualiza o usuário pelo ID
      const updatedRows = await UsersModel.update(
        { usuario, senha, isAdmin },
        { where: { id } }
      );

      if (updatedRows === 0) {
        throw new AppError("Usuário não encontrado.", 404);
      }

      res.json({ mensagem: "Usuário alterado com sucesso." });
    } catch (error) {
      console.error(error);
      res
        .status(error.status || 500)
        .json({ mensagem: error.message || "Erro interno do servidor." });
    }
  }
}

module.exports = new AdmController();
