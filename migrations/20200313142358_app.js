
exports.up = function(knex) {
  return knex.schema.createTable('app', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('link').notNull()
      table.string('description')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('app')
};
