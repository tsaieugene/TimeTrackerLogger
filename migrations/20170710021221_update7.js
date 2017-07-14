//date as string column
exports.up = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.string('date');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.dropColumn('date');
    });
};
