const prisma = require("../database");

class NotasController {
  async create(req, res) {
    const { valor, bimestre, turmaAlunoId } = req.body;

    if (!valor) {
      throw new AppError("É preciso informar a nota.");
    }

    if (!bimestre) {
      throw new AppError("É preciso informar o bimestre da nota.");
    }

    if (!turmaAlunoId) {
      throw new AppError(
        "É preciso informar o id do aluno onde a nota será cadastrada."
      );
    }

    const nota = await prisma.nota.create({
      data: { valor, bimestre, turmaAlunoId },
    });

    res.status(201).json(nota);
  }

  async index(req, res) {
    const notas = await prisma.nota.findMany();

    if (!alunos) {
      throw new AppError("Nenhum registro encontrado.");
    }

    res.status(200).json(notas);
  }

  async update(req, res) {
    const { id } = req.params;
    const { valor } = req.body;

    if (!id) {
      throw new AppError("É necessário passar o id do item que será alterado.");
    }

    if (!valor) {
      throw new AppError("É necessário passar o novo valor do item.");
    }

    const nota = await prisma.nota.update({
      where: { id: parseInt(id) },
      data: { valor },
    });

    res.status(200).json(nota);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new AppError("É necessário passar o id do item que será excluído.");
    }

    await prisma.nota.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Nota excluída com sucesso." });
  }
}

module.exports = NotasController;
