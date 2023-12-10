const { TurmasModel } = require("../database/sequelize");
const AppError = require("../utils/AppError");

class TurmasController {
  async create(req, res) {
    const { nome, ano, escolaId } = req.body;

    if (!nome || !ano || !escolaId ) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await TurmasModel.create({
      nome,
      ano,
      escolaId,
    })

    res.json("Turma criada com sucesso!");
  }

  async index(req, res) {
    const turmas = await TurmasModel.findAll()

    res.json(turmas);
  }

  async update(req, res) {
    const { turmaId } = req.params;
    const { nome, ano, escolaId } = req.body;

    await TurmasModel.update({
      nome,
      ano,
      escolaId,
    },
    {
      where: { id: turmaId },
    })

    res.json("Turma atualizada com sucesso!");
  }

  async delete(req, res) {
    const { alunoId } = req.params;

    await AlunosModel.destroy({
      where: { id: alunoId },
    });

    res.json("Aluno excluido com sucesso!");
  }
}

module.exports = TurmasController;
