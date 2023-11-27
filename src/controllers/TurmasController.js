const prisma = require("../database");

class TurmasController {
  async create(req, res) {
    const { materiaId, ano, escolaId } = req.body;

    if (!materiaId) {
      throw new AppError(
        "É preciso informar o id da matéria a qual a turma será vinculada."
      );
    }

    if (!escolaId) {
      throw new AppError(
        "É preciso informar o id da escola a qual a turma será vinculada."
      );
    }

    if (!ano) {
      throw new AppError("É preciso informar o ano da turma.");
    }

    const turma = await prisma.turma.create({
      data: { materiaId, ano, escolaId },
    });

    res.status(201).json(turma);
  }

  async index(req, res) {
    const turmas = await prisma.turma.findMany();

    if (!turmas) {
      throw new AppError("Nenhum registro de turmas encontrado.");
    }

    res.status(200).json(turmas);
  }

  async update(req, res) {
    const { id } = req.params;
    const { materiaId, ano } = req.body;

    if (!id) {
      throw new AppError("É necessário passar o id do item que será alterado.");
    }

    if (!materiaId) {
      throw new AppError("É necessário passar o ano da turma atualizado");
    }

    const turma = await prisma.turma.update({
      where: { id: parseInt(id) },
      data: { materiaId, ano },
    });

    res.status(200).json(turma);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new AppError("É necessário passar o id do item que será excluído.");
    }

    await prisma.turma.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Turma excluída com sucesso." });
  }
}

module.exports = TurmasController;
