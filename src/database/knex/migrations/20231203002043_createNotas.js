exports.up = knex => knex.schema.createTable("notas", table => {
  table.increments("id");
  table.integer("nota");
  table.integer("bimestre");
  table.integer("materiaId").references("materias.id");
  table.integer("alunoId").references("alunos.id");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("notas");