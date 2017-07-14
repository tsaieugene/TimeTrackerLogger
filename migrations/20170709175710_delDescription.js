//delete description column
exports.up = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.dropColumn('description');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.text('description');
    });
};
