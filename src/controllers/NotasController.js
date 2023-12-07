const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotasController {
  async create(req, res) {
    const { nota, materiaId, alunoId } = req.body;

    if (!nota) {
      throw new AppError("É preciso informar a nota.");
    }

    if (!materiaId) {
      throw new AppError("É preciso informar o bimestre da nota.");
    }

    if (!alunoId) {
      throw new AppError(
        "É preciso informar o id do aluno onde a nota será cadastrada."
      );
    }

    await knex("notas").insert({ nota, materiaId, alunoId });

    res.status(201).json();
  }

  // async index(req, res) {
  //   const notas = await prisma.nota.findMany();

  //   if (!alunos) {
  //     throw new AppError("Nenhum registro encontrado.");
  //   }

  //   res.status(200).json(notas);
  // }

  // async update(req, res) {
  //   const { id } = req.params;
  //   const { valor } = req.body;

  //   if (!id) {
  //     throw new AppError("É necessário passar o id do item que será alterado.");
  //   }

  //   if (!valor) {
  //     throw new AppError("É necessário passar o novo valor do item.");
  //   }

  //   const nota = await prisma.nota.update({
  //     where: { id: parseInt(id) },
  //     data: { valor },
  //   });

  //   res.status(200).json(nota);
  // }

  // async delete(req, res) {
  //   const { id } = req.params;

  //   if (!id) {
  //     throw new AppError("É necessário passar o id do item que será excluído.");
  //   }

  //   await prisma.nota.delete({ where: { id: parseInt(id) } });

  //   res.status(200).json({ message: "Nota excluída com sucesso." });
  // }
}

module.exports = NotasController;
