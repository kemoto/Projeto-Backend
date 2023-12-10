// userController.js
const { UsersModel } = require("../database/sequelize");
const AppError = require("../utils/AppError");

class UserController {
  async alterarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { usuario, senha } = req.body;

      // Atualiza o usuário pelo ID
      const updatedRows = await UsersModel.update(
        { usuario, senha },
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

module.exports = new UserController();
