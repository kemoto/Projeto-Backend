exports.up = knex => knex.schema.createTable("escolas", table => {
  table.increments("id");
  table.text("nome");
  table.text("contato");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("escolas");