const {
  AlunosModel,
  NotasModel,
  MateriasModel,
} = require("../database/sequelize");
const AppError = require("../utils/AppError");

class AlunosController {
  async create(req, res) {
    const { nome, escolaId, turmaId } = req.body;

    if (!nome || !escolaId || !turmaId) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await AlunosModel.create({ nome, escolaId, turmaId });

    res.json("Aluno criado com suceso!");
  }

  async show(req, res) {
    const { alunoId } = req.params;

    if (!alunoId) {
      throw new AppError("Aluno não encontrado.");
    }

    const alunoComMaterias = await AlunosModel.findAll({
      where: { id: alunoId },
      include: [
        {
          model: NotasModel,
          attributes: [],
          include: [
            {
              model: MateriasModel,
              attributes: ["nome"],
            },
          ],
        },
      ],
    });

    res.json(alunoComMaterias);
  }

  async index(req, res) {
    const alunos = await AlunosModel.findAll();

    res.json(alunos);
  }

  async update(req, res) {
    const { alunoId } = req.params;
    const { nome, escolaId, turmaId } = req.body;

    if (!nome || !escolaId || !turmaId) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await AlunosModel.update(
      {
        nome,
        escolaId,
        turmaId,
      },
      {
        where: {
          id: alunoId,
        },
      }
    );

    res.json("Aluno atualizado com sucesso!");
  }

  async delete(req, res) {
    const { alunoId } = req.params;

    await AlunosModel.destroy({
      where: { id: alunoId },
    });

    res.json("Aluno excluido com sucesso!");
  }
}

module.exports = AlunosController;
