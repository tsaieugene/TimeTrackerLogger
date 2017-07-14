//add userId to todo table

exports.up = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.integer('userId');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.dropColumn('userId');
    });
};