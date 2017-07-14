//remove createdBy column from todo
exports.up = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.dropColumn('createdBy');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.integer('createdBy');
    });
};
