const { MateriasModel } = require("../database/sequelize");
const AppError = require("../utils/AppError");

class MateriasController {
  async create(req, res) {
    const { nome } = req.body;

    if (!nome) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await MateriasModel.create({ nome });

    res.json("Materia criada com suceso!");
  }

  async index(req, res) {
    const materias = await MateriasModel.findAll();

    res.json(materias);
  }

  async update(req, res) {
    const { materiaId } = req.params;
    const { nome } = req.body;

    if (!nome) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await MateriasModel.update(
      {
        nome,
      },
      {
        where: {
          id: materiaId,
        },
      }
    );

    res.json("Materia atualizada com sucesso!");
  }

  async delete(req, res) {
    const { materiaId } = req.params;

    await MateriasModel.destroy({
      where: { id: materiaId },
    });

    res.json("Materia excluida com sucesso!");
  }
}

module.exports = MateriasController;
