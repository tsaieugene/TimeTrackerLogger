
//create createdBy column of type bigint for todo table
exports.up = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.bigint('createdBy').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todo', (table) => {
        table.dropColumn('createdBy');
    });
};

