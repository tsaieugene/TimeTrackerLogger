
exports.up = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
        table.increments();
        table.integer('facebookID').notNullable();
        table.text('name');
        table.datetime('date').notNullable();
    });
};
