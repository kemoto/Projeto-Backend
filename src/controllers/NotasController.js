const sequelize = require("../database/sequelize");
const { NotasModel, AlunosModel } = require("../database/sequelize");
const AppError = require("../utils/AppError");

class NotasController {
  async create(req, res) {
    const { nota, bimestre, materiaId, alunoId } = req.body;

    if (!nome || !bimestre || !materiaId || !alunoId) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    const verificaNota = await NotasModel.findOne({
      where: {
        bimestre,
        materiaId,
        alunoId,
      },
    });

    if (verificaNota) {
      throw new AppError("Nota já cadastrada para esse bimestre.");
    }

    await NotasModel.create({
      nota,
      bimestre,
      materiaId,
      alunoId,
    });

    res.json("Nota cadastrada com sucesso!");
  }

  async index(req, res) {
    const { alunoId } = req.params;

    const notasAluno = await NotasModel.findAll({
      where: {
        alunoId,
      },
    });

    res.json(notasAluno);
  }

  async update(req, res) {
    const { notaId } = req.params;
    const { nota, materiaId, alunoId } = req.body;

    await NotasModel.update(
      {
        nota,
        materiaId,
        alunoId,
      },
      {
        where: { id: notaId },
      }
    );

    res.json("Nota atualizada com sucesso!");
  }

  async delete(req, res) {
    const { notaId } = req.params;

    await NotasModel.destroy({
      where: { id: notaId },
    });

    res.json("Nota excluida com sucesso!");
  }
}

module.exports = NotasController;
