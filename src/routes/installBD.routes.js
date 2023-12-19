const { Router } = require("express");
const {
  sequelize,
  UsersModel,
  AlunosModel,
  EscolasModel,
  TurmasModel,
  MateriasModel,
  NotasModel,
} = require("../database/sequelize");

const installBD = Router();

const novosUsuarios = [
  {
    usuario: "Usuario1",
    senha: "123",
    isAdmin: true,
  },
  {
    usuario: "Usuario2",
    senha: "123",
    isAdmin: false,
  },
  {
    usuario: "Usuario3",
    senha: "123",
    isAdmin: false,
  },
  {
    usuario: "Usuario4",
    senha: "123",
    isAdmin: false,
  },
  {
    usuario: "Usuario5",
    senha: "123",
    isAdmin: false,
  },
];

const novasEscolas = [
  {
    nome: "Escola teste",
    contato: "1",
  },
  {
    nome: "Escola teste",
    contato: "1",
  },
  {
    nome: "Escola teste",
    contato: "1",
  },
  {
    nome: "Escola teste",
    contato: "1",
  },
  {
    nome: "Escola teste",
    contato: "1",
  },
];

const novasTurmas = [
  {
    nome: "Turma teste1",
    ano: "2023",
    EscolaId: "1",
  },
  {
    nome: "Turma teste2",
    ano: "2023",
    EscolaId: "1",
  },
  {
    nome: "Turma teste3",
    ano: "2023",
    EscolaId: "1",
  },
  {
    nome: "Turma teste4",
    ano: "2023",
    EscolaId: "1",
  },
  {
    nome: "Turma teste5",
    ano: "2023",
    EscolaId: "1",
  },
];

const novosAlunos = [
  {
    nome: "João",
    EscolaId: "1",
    TurmaId: "1",
  },
  {
    nome: "João",
    EscolaId: "1",
    TurmaId: "1",
  },
  {
    nome: "João",
    EscolaId: "1",
    TurmaId: "1",
  },
  {
    nome: "João",
    EscolaId: "1",
    TurmaId: "1",
  },
  {
    nome: "João",
    EscolaId: "1",
    TurmaId: "1",
  },
];

const novasMaterias = [
  {
    nome: "Matematica",
  },
  {
    nome: "Portugues",
  },
  {
    nome: "Geografia",
  },
  {
    nome: "Biologia",
  },
  {
    nome: "Historia",
  },
];

const novasNotas = [
  {
    nota: "10",    
    bimestre: "1",    
    MateriaId: "1",    
    AlunoId: "1",
  },
  {
    nota: "10",    
    bimestre: "1",    
    MateriaId: "2",    
    AlunoId: "1",
  },
  {
    nota: "10",    
    bimestre: "1",    
    MateriaId: "3",    
    AlunoId: "1",
  },
  {
    nota: "10",    
    bimestre: "1",    
    MateriaId: "4",    
    AlunoId: "1",
  },
  {
    nota: "10",    
    bimestre: "1",    
    MateriaId: "5",    
    AlunoId: "1",
  },
];

installBD.get("/install", async (req, res) => {
  await sequelize.sync({ force: true });

  await UsersModel.bulkCreate(novosUsuarios);
  await EscolasModel.bulkCreate(novasEscolas);
  await TurmasModel.bulkCreate(novasTurmas);
  await AlunosModel.bulkCreate(novosAlunos);
  await MateriasModel.bulkCreate(novasMaterias);
  await NotasModel.bulkCreate(novasNotas);

  res.status(201).json();
});

module.exports = installBD;
