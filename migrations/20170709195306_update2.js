//remove priority column from todo
exports.up = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.dropColumn('priority');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.text('priority');
    });
};
