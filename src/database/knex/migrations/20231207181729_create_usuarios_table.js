exports.up = function (knex) {
    return knex.schema.createTable("usuarios", function (table) {
      table.increments("id").primary(); // Campo de ID autoincrementável
      table.string("usuario").notNullable().unique(); // Campo para o nome de usuário
      table.string("senha").notNullable(); // Campo para a senha (deve ser armazenada de maneira segura, considerando hash e salt)
      table.boolean("isAdmin").defaultTo(false); // Campo para indicar se o usuário é um administrador
      table.timestamps(true, true); // Adiciona automaticamente os campos created_at e updated_at
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("usuarios");
  };
  