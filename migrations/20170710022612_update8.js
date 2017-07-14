//create time column for todo table
exports.up = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.integer('time').defaultTo(0).notNullable();;
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.dropColumn('time');
    });
};
