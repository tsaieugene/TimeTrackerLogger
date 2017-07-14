exports.up = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.dropColumn('date');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.datetime('date');
    });
};