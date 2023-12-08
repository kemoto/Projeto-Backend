const jwt = require("jsonwebtoken");
const knex = require("../database/knex");

async function login(req, res) {
  try {
    const { usuario, senha } = req.body;

    // Busca o usuário no banco de dados
    let usuarioAutenticado = await knex("usuarios").where({ usuario }).first();

    // Se o usuário não existir, cria um novo usuário
    if (!usuarioAutenticado) {
      await knex("usuarios").insert({ usuario, senha });
      
      // Busca novamente o usuário recém-criado
      usuarioAutenticado = await knex("usuarios").where({ usuario }).first();
    }
    
    if (senha !== usuarioAutenticado.senha) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }
    
    // Gera um token JWT
    const token = jwt.sign(
      { id: usuarioAutenticado.id, usuario: usuarioAutenticado.usuario, senha: usuarioAutenticado.senha, isAdmin: usuarioAutenticado.isAdmin },
      "segredo",
      {
        expiresIn: "1h",
      }
    );

    return res.json({ logged: true, token:token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = { login };
