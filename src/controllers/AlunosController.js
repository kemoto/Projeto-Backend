const prisma = require("../database");

class AlunosController {
  async create(req, res) {
    const { nome, escolaId } = req.body;

    if (!nome) {
      throw new AppError("É preciso informar o nome do aluno.");
    }

    if (!escolaId) {
      throw new AppError(
        "É preciso informar o id da escola onde o aluno será cadastrado."
      );
    }

    const aluno = await prisma.aluno.create({
      data: { nome, escolaId },
    });

    res.status(201).json(aluno);
  }

  async index(req, res) {
    const alunos = await prisma.aluno.findMany();

    if (!alunos) {
      throw new AppError("Nenhum registro encontrado.");
    }

    res.status(200).json(alunos);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    if (!id) {
      throw new AppError("É necessário passar o id do item que será alterado.");
    }

    if (!nome) {
      throw new AppError("É necessário passar o novo nome do item.");
    }

    const aluno = await prisma.aluno.update({
      where: { id: parseInt(id) },
      data: { nome },
    });

    res.status(200).json(aluno);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new AppError("É necessário passar o id do item que será excluído.");
    }

    await prisma.aluno.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Aluno excluído com sucesso." });
  }
}

module.exports = AlunosController;
