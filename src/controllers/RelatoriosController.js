const { NotasModel } = require("../database/sequelize");
const AppError = require("../utils/AppError");

class RelatoriosController {
  async mediaAluno(req, res) {
    const { id } = req.query;
    const somaNotas = {};
    const contagemNotas = {};
    const mediaNotas = {};

    const dados = await NotasModel.findAll({ where: { alunoId: id } });

    dados.forEach((registro) => {
      const materiaId = registro.materiaId;
      const nota = registro.nota;

      somaNotas[materiaId] = (somaNotas[materiaId] || 0) + nota;
      contagemNotas[materiaId] = (contagemNotas[materiaId] || 0) + 1;
    });

    Object.keys(somaNotas).forEach((materiaId) => {
      const soma = somaNotas[materiaId];
      const contagem = contagemNotas[materiaId];

      mediaNotas[materiaId] = soma / contagem;
    });

    res.json(mediaNotas);
  }

  async mediaPeriodo(req, res) {
    const { bimestreInicio, bimestreFim } = req.query;

    if((bimestreFim - bimestreInicio) < 1) {
      throw new AppError("É preciso pelo menos 2 bimestres para fazer a média do período.");
    }

    const notas = await NotasModel.findAll({
      where: {
        bimestre: {
          [Op.gte]: bimestreInicio,
          [Op.lte]: bimestreFim,
        },
      },
    });

    notas.forEach(nota => {
      const { idAluno, idMateria, nota: notaValor, bimestre } = nota;
  
      if (bimestre >= bimestreInicio && bimestre <= bimestreFim) {
        const chave = `${idAluno}-${idMateria}-${bimestre}`;
  
        if (!mediasPorAlunoMateriaBimestre[chave]) {
          mediasPorAlunoMateriaBimestre[chave] = {
            total: notaValor,
            contador: 1,
          };
        } else {
          mediasPorAlunoMateriaBimestre[chave].total += notaValor;
          mediasPorAlunoMateriaBimestre[chave].contador += 1;
        }
      }
    });

    const mediasFinais = Object.entries(mediasPorAlunoMateriaBimestre).map(([chave, { total, contador }]) => {
      const [idAluno, idMateria, bimestre] = chave.split('-');
      const media = total / contador;
  
      return {
        idAluno: parseInt(idAluno, 10),
        idMateria: parseInt(idMateria, 10),
        bimestre: parseInt(bimestre, 10),
        media,
      };
    });

    res.json(mediasFinais);
  }
}

module.exports = RelatoriosController;
