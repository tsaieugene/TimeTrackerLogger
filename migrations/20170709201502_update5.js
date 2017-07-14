
//rename userId in todo table to createdBy

exports.up = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.renameColumn('userId', 'createdBy');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.dropColumn('userId', 'createdBy');
    });
};