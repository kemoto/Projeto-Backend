const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MateriasController {
  async create(req, res) {
    const { nome, escolaId } = req.body;

    if (!nome) {
      throw new AppError("Nome não definido.");
    }

    await knex("materias").insert({ nome, escolaId });
    res.status(201).json();
  }

  // async index(req, res) {
  //   const materias = await prisma.materia.findMany();

  //   if (!materias) {
  //     throw new AppError("Nenhum registro encontrado.");
  //   }

  //   res.status(200).json(materias);
  // }

  // async update(req, res) {
  //   const { id } = req.params;
  //   const { nome } = req.body;

  //   if (!id) {
  //     throw new AppError("É necessário passar o id do item que será alterado.");
  //   }

  //   if (!nome) {
  //     throw new AppError("É necessário passar o novo nome do item.");
  //   }

  //   const materia = await prisma.materia.update({
  //     where: { id: parseInt(id) },
  //     data: { nome },
  //   });

  //   res.status(200).json(materia);
  // }

  // async delete(req, res) {
  //   const { id } = req.params;

  //   if (!id) {
  //     throw new AppError("É necessário passar o id do item que será excluído.");
  //   }

  //   await prisma.materia.delete({ where: { id: parseInt(id) } });

  //   res.status(200).json({ message: "Matéria excluída com sucesso." });
  // }
}

module.exports = MateriasController;
