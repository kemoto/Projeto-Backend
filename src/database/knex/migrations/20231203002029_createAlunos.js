exports.up = knex => knex.schema.createTable("alunos", table => {
  table.increments("id");
  table.text("nome");
  table.integer("escolaId").references("escolas.id");
  table.integer("turmaId").references("turmas.id");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("alunos");