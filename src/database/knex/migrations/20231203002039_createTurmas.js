exports.up = knex => knex.schema.createTable("turmas", table => {
  table.increments("id");
  table.text("nome");
  table.integer("ano");
  table.integer("escolaId").references("escolas.id");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("turmas");
