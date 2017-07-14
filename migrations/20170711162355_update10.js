

//create full name column for user table
exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.text('fullName').notNullable();;
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('fullName');
    });
};
