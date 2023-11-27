const prisma = require("../database");

class EscolasController {
  async create(req, res) {
    const { nome, endereco, contato } = req.body;

    if (!nome || !endereco || !contato) {
      throw new AppError(
        "Todos os campos são necessários para completar o cadastro."
      );
    }

    const escola = await prisma.escola.create({
      data: { nome, endereco, contato },
    });

    res.status(201).json(escola);
  }

  async index(req, res) {
    const escolas = await prisma.escola.findMany();

    if (!escolas) {
      throw new AppError("Nenhum registro foi encontrado.");
    }

    res.status(200).json(escolas);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, endereco, contato } = req.body;

    if (!id) {
      throw new AppError("É necessário passar o id do item que será alterado.");
    }

    const escola = await prisma.escola.update({
      where: { id: parseInt(id) },
      data: { nome, endereco, contato },
    });

    res.status(200).json(escola);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new AppError("É necessário passar o id do item que será excluído.");
    }

    await prisma.escola.delete({ where: { id: parseInt(id) } });
    
    res.status(200).json({ message: "Escola excluída com sucesso." });
  }
}

module.exports = EscolasController;
