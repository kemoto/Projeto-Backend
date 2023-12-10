const { EscolasModel, TurmasModel } = require("../database/sequelize");
const AppError = require("../utils/AppError");

class EscolasController {
  async create(req, res) {
    const { nome, contato } = req.body;

    if (!nome || !contato) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await EscolasModel.create({ nome, contato });

    res.json("Escola criada com suceso!");
  }

  async show(req, res) {
    const { escolaId } = req.params;

    const escolasComTurmas = await EscolasModel.findAll({
      where: { id: escolaId },
      include: [
        {
          model: TurmasModel,
          attributes: [],
        },
      ],
    });

    res.json(escolasComTurmas);
  }

  async index(req, res) {
    const escolas = await EscolasModel.findAll();

    res.json(escolas);
  }

  async update(req, res) {
    const { escolaId } = req.params;
    const { nome, contato } = req.body;

    if (!nome || !contato) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await EscolasModel.update(
      {
        nome,
        contato,
      },
      {
        where: {
          id: escolaId,
        },
      }
    );

    res.json("Escola atualizada com sucesso!");
  }

  async delete(req, res) {
    const { escolaId } = req.params;

    await EscolasModel.destroy({
      where: { id: escolaId },
    });

    res.json("Escola excluida com sucesso!");
  }
}

module.exports = EscolasController;
