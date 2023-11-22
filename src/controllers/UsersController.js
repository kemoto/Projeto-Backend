const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(req, res) {
    const {name, email, password} = req.body;
    const database = await sqliteConnection();
    
    const checkIfEmailIsAlreadyInUse = await database.get("SELECT email FROM users WHERE email = (?)", [email]);

    if(checkIfEmailIsAlreadyInUse) {
      throw new AppError("E-mail já cadastrado.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run("INSERT INTO users (name, email, password) VALUES ((?), (?), (?))", [name, email, hashedPassword]);

    return res.status(201).json();
  }

  async update(req, res) {
    const {name, email, password, oldPassword} = req.body;
    const {id} = req.params;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user) {
      throw new AppError("Usuário não cadastrado.");
    }

    const verifyIfEmailIsAlreadyInUse = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(verifyIfEmailIsAlreadyInUse && verifyIfEmailIsAlreadyInUse.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(!oldPassword) {
      throw new AppError("É preciso informar a senha antiga.");
    }

    if(password && oldPassword) {
      const comparePasswords = await compare(oldPassword, user.password);

      if(!comparePasswords) {
        throw new AppError("As senhas não conferem.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
        UPDATE users SET
          name = (?),
          email = (?),
          password = (?),
          updatedAt = DATETIME('now')
        WHERE id = (?)`, 
      [user.name, user.email, user.password, id]
    );

    return res.status(200).json();
  }
}

module.exports = UsersController;