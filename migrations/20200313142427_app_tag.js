
exports.up = function(knex) {
    return knex.schema.createTable('app_tag', table => {
        table.increments('id').primary()
        table.integer('idapp').notNull()
        table.integer('idtag').notNull()
        table.foreign('idapp').references('id').inTable('app')
        table.foreign('idtag').references('id').inTable('tag')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('app_tag')
};
