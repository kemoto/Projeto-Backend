const knex = require("../database/knex");

class RelatoriosController {
  async mediaAluno(req, res) {
    const { id } = req.query;
    const somaNotas = {};
    const contagemNotas = {};
    const mediaNotas = {};

    const dados = await knex("notas").where({ alunoId: id });

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
    const { id } = req.query;
    const mediasPorAlunoMateriaBimestre = {};


    const data = await knex("notas").where({alunoId: id});

    // Percorra os dados e calcule as médias
    data.forEach((nota) => {
      const { idAluno, idMateria, nota: notaValor, bimestre } = nota;

      // Verifique se o bimestre está dentro do intervalo desejado
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

    // Calcule as médias finais
    const mediasFinais = Object.entries(mediasPorAlunoMateriaBimestre).map(
      ([chave, { total, contador }]) => {
        const [idAluno, idMateria, bimestre] = chave.split("-");
        const media = total / contador;

        return {
          idAluno: parseInt(idAluno, 10),
          idMateria: parseInt(idMateria, 10),
          bimestre: parseInt(bimestre, 10),
          media,
        };
      }
    );

    res.json(mediasFinais);
  }
}

module.exports = RelatoriosController;

// Função para calcular as médias por bimestre em um intervalo a partir dos dados da API
function calcularMediasPorIntervaloAPI(data, bimestreInicio, bimestreFim) {
  // Crie um objeto para armazenar as médias por bimestre e matéria
  const mediasPorAlunoMateriaBimestre = {};

  // Percorra os dados e calcule as médias
  data.forEach((nota) => {
    const { idAluno, idMateria, nota: notaValor, bimestre } = nota;

    // Verifique se o bimestre está dentro do intervalo desejado
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

  // Calcule as médias finais
  const mediasFinais = Object.entries(mediasPorAlunoMateriaBimestre).map(
    ([chave, { total, contador }]) => {
      const [idAluno, idMateria, bimestre] = chave.split("-");
      const media = total / contador;

      return {
        idAluno: parseInt(idAluno, 10),
        idMateria: parseInt(idMateria, 10),
        bimestre: parseInt(bimestre, 10),
        media,
      };
    }
  );

  return mediasFinais;
}

// Suponha que você tenha os dados da API diretamente (substitua conforme necessário)
const dadosDaAPI = [
  {
    id: 1,
    idAluno: 1,
    idMateria: 1,
    nota: 75,
    bimestre: 1,
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    idAluno: 1,
    idMateria: 2,
    nota: 80,
    bimestre: 2,
    createdAt: "2023-02-01",
  },
  {
    id: 3,
    idAluno: 1,
    idMateria: 1,
    nota: 90,
    bimestre: 3,
    createdAt: "2023-03-01",
  },
  // Adicione mais dados conforme necessário
];

// Use a função para obter as médias por bimestre em um intervalo (por exemplo, do bimestre 2 ao 4)
const bimestreInicio = 2;
const bimestreFim = 4;
const mediasNoIntervalo = calcularMediasPorIntervaloAPI(
  dadosDaAPI,
  bimestreInicio,
  bimestreFim
);

// Exiba as médias calculadas no intervalo
console.log(mediasNoIntervalo);
